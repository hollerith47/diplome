<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\EmailVerificationRequest;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use App\Traits\HttpResponses;
use Ichtrojan\Otp\Otp;
use Illuminate\Http\Request;


class EmailVerificationController extends Controller
{
    use HttpResponses;
    private Otp $otp;
    public function __construct(){
        $this->otp = new Otp;
    }

    public function sendEmailVerification(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->user()->notify(new EmailVerificationNotification());
        $success['success'] = true;
        return $this->success($success, "Email Verification sent successfully");
    }
    public function emailVerification(EmailVerificationRequest $request): \Illuminate\Http\JsonResponse
    {
        $otp2 = $this->otp->validate($request->email, $request->otp);
        // !false === true the throw exception
        if (!$otp2->status){
            return $this->error(["error" => "Verification failed"],401);
        }
        $user = User::where("email", $request->email)->first();
        $user->update(["email_verified_at"=> now()]);
        $success['success'] = true;
        return $this->success($success, "Email Verification successful");
    }


}
