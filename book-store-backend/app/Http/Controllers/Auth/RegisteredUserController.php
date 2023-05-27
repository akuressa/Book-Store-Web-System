<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;
use Exception;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    public function create(): View
    {
        return view('auth.register');
    }
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(
                ($request->userType === 'author') ? (new Author)->getTable() : (new User)->getTable()
            )],
            'password' => ['required', Password::min(8)],
        ]);

        if ($validate->fails())
        {
            return response()->json(['msg'=>'Validation error', 'data'=>$validate->errors()], 422);
        };

        try {
            if ($request->userType == 'author') {
                $author = Author::create([
                    'username' => $request->username,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                return response()->json(['status' =>true, 'msg'=>'user registration is success' ,'name' => $author->username]);
            } else {
                $user = User::create([
                    'username' => $request->username,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                ]);
                return response()->json(['status' =>true, 'msg'=>'user registration is success' ,'name' => $user->username]);
            }
        } catch(Exception $e){
            return response()->json([
                'msg'=>$e->getMessage()
            ], $e->getCode());

        }

    }
}
