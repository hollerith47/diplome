<?php

namespace App\Traits;

use App\Notifications\LoginNotification;

trait AuthenticatesUsers
{
    use HttpResponses;
    protected function loginUser($user, $request): \Illuminate\Http\JsonResponse
    {
        $user->tokens()->delete();
//        $user->notify(new LoginNotification());

        return $this->success([
            'user' => $user,
            'token' => $user->createToken($request->userAgent())->plainTextToken,
        ], "Login successful");
    }
}
