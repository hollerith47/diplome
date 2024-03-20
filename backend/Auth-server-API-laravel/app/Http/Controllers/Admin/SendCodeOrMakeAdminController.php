<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SendAdminCodeRequest;
use App\Models\User;
use App\Notifications\AdminCodeRegistrationNotification;
use App\Notifications\SendSetAdminNotification;
use App\Traits\HttpResponses;
use Ichtrojan\Otp\Otp;
use Illuminate\Http\Request;

class SendCodeOrMakeAdminController extends Controller
{
    use HttpResponses;
    public function setAdmin(SendAdminCodeRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = User::where("email", $request->email)->first();
        if ($user) {
            $user->update(["role" => "admin"]);
            $user->notify(new SendSetAdminNotification());
            return $this->success([], 'User role updated to admin successfully.');
        } else {
            $tempUser = new User();
            $tempUser->email = $request->email;
            $tempUser->first_name = $request->first_name;

            $tempUser->notify(new AdminCodeRegistrationNotification());
            return $this->success([], 'Admin code sent to user successfully.');
        }
    }
}
