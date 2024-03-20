<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminRegisterController extends Controller
{
    use HttpResponses;
    public function registerAdmin(RegisterRequest $request): \Illuminate\Http\JsonResponse
    {
        $newUser = $request->validated();
        $newUser['password'] = Hash::make($newUser['password']);
        $newUser['status'] = 'active';
        $newUser['role'] = 'admin';
        $user = User::create($newUser);
        $success['token'] = $user->createToken("user", ['app:all'])->plainTextToken;
        $success['name'] = $user->first_name;
        $user->notify(new EmailVerificationNotification());

        return $this->success($success, 'user registered');
    }
}
