<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function show(): View
    {
        return view('auth.confirm-password');
    }

    /**
     * Confirm the user's password.
     */
    // public function store(Request $request): RedirectResponse
    // {
    //     if (! Auth::guard('web')->validate([
    //         'email' => $request->user()->email,
    //         'password' => $request->password,
    //     ])) {
    //         throw ValidationException::withMessages([
    //             'password' => __('auth.password'),
    //         ]);
    //     }

    //     $request->session()->put('auth.password_confirmed_at', time());

    //     return redirect()->intended(RouteServiceProvider::HOME);
    // }

    public function store(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = $request->user();

        if (Auth::guard('web')->validate([
            'email' => $user->email,
            'password' => $request->password,
        ])) {
            $request->session()->put('auth.password_confirmed_at', time());

            return redirect()->intended(RouteServiceProvider::HOME);
        } elseif (Auth::guard('author')->validate([
            'email' => $user->email,
            'password' => $request->password,
        ])) {
            $request->session()->put('auth.password_confirmed_at', time());

            return redirect()->intended(RouteServiceProvider::HOME); // Redirect to the admin dashboard or any other desired location
        }

        throw ValidationException::withMessages([
            'password' => __('auth.password'),
        ]);
    }

}
