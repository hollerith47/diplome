<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutAuthController extends Controller
{
    use HttpResponses;
    public function logout(): \Illuminate\Http\JsonResponse
    {
        Auth::user()->tokens()->delete();
        return $this->success([], "User logged out successfully");
    }
}
