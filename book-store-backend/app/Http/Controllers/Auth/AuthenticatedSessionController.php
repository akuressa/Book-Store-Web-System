<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use App\Models\Admin;
use App\Models\Author;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    public function create(): View
    {
        return view('auth.login');
    }

    public function store(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if ($validate->fails())
        {
            return response()->json(['msg'=>'Validation error', 'data'=>$validate->errors()], 422);
        };

        $credentials = $request->only('email', 'password');

        if($request->userType == 'author' && Auth::guard('author')->attempt($credentials) )
        {
            $author = Author::where('email', $request->email)->first();
            if ($author->is_active == 1)
            {
                $author['access_token'] = $author->createToken('accessToken')->accessToken;

                return response()->json(['msg'=>'succesfully logged in', 'user'=>$author->only('id', 'username', 'access_token')]);
            }

            return response()->json(['msg'=>'User is Deactivated.'], 401);
        }
        elseif ($request->userType == 'admin' && Auth::guard('admin')->attempt($credentials))
        {
            $admin = Admin::where('email', $request->email)->first();
            $admin['access_token'] = $admin->createToken('accessToken')->accessToken;

            return response()->json(['msg'=>'succesfully logged in', 'user'=>$admin->only('id', 'username', 'access_token')]);
        }
        elseif ($request->userType == 'visitor' && Auth::guard('web')->attempt($credentials))
        {
            $visitor = User::where('email', $request->email)->first();
            $visitor['access_token'] = $visitor->createToken('accessToken')->accessToken;

            return response()->json(['msg'=>'succesfully logged in', 'user'=>$visitor->only('id', 'username', 'access_token')]);
        }
        else
        {
            return response()->json(['msg'=>'unauthorized, Please check the credentials again..'], 401);
        }
    }

    public function adminLogOut(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();

        return response()->json(['msg'=>'succesfully logged out']);
    }

    public function visitorLogout(Request $request) {
        $token = $request->user()->token();
        $token->revoke();

        return response()->json(['msg'=>'succesfully logged out']);
    }

    public function authorLogout(Request $request) {
        $token = $request->user()->token();
        $token->revoke();

        return response()->json(['msg'=>'succesfully logged out']);
    }
}
