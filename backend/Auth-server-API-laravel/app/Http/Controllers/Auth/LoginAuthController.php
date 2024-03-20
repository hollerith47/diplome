<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Notifications\LoginNotification;
use App\Traits\AuthenticatesUsers;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginAuthController extends Controller
{
    use HttpResponses, AuthenticatesUsers;

    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        $request->validated($request->all());
        if (Auth::attempt($request->only("email", "password"))) {
            $user = Auth::user();
            $user->image ? $user->image = $user->image_url: "";
            return $this->loginUser($user, $request);
        } else {
            return $this->error(["error" => "Unauthorised"], 401, "login failed email/password incorrect");
        }
    }
}
