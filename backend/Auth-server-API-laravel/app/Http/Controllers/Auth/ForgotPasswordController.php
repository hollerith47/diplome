<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Models\User;
use App\Notifications\ResetPasswordVerificationNotification;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    use HttpResponses;
    public function forgotPassword(ForgotPasswordRequest $request): \Illuminate\Http\JsonResponse
    {
        $email = $request->only("email");
        $user = User::where("email", $email)->first();
        $user->notify(new ResetPasswordVerificationNotification());
        $success['success'] = true;
        return $this->success($success, "Reset code sent successfully to email");

    }
}
