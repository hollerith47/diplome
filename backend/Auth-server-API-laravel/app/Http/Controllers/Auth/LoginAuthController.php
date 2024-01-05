<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Notifications\LoginNotification;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginAuthController extends Controller
{
    use HttpResponses;
    public function login(LoginRequest $request)
    {
        $request->validated($request->all());
        if (Auth::attempt($request->only("email", "password"))){
            $user = Auth::user();
            $user->tokens()->delete();

            $user->notify(new LoginNotification());

            return $this->success([
                'user' => $user,
                'token' => $user->createToken($request->userAgent())->plainTextToken,
            ], "Login successful");

        }else{
            return $this->error(["error"=> "Unauthorised"], 401, "login failed email/password incorrect");
        }
    }
}
