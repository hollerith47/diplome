<?php

use App\Events\Hello;
use App\Http\Controllers\Admin\AdminLoginController;
use App\Http\Controllers\Admin\AdminRegisterController;
use App\Http\Controllers\Admin\SendCodeOrMakeAdminController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginAuthController;
use App\Http\Controllers\Auth\LogoutAuthController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\RegisterAuthController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// users auth
Route::post("register", [RegisterAuthController::class, 'register']);
Route::post("login", [LoginAuthController::class, 'login']);

// admin auth
Route::post("admin/register", [AdminRegisterController::class, 'registerAdmin']);
Route::post("admin/login", [AdminLoginController::class, 'loginAdmin']);

Route::post("forgot-password", [ForgotPasswordController::class, 'forgotPassword']);
Route::post("reset-password", [ResetPasswordController::class, 'passwordReset']);

Route::get("/test", function () {
    event(new App\Events\Hello());
    event(new App\Events\MessageSent());
    return "Event has been sent!";
});

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get("users", [UsersController::class, 'getUsers']);

    // set admin
    Route::post("admin/set-admin", [SendCodeOrMakeAdminController::class, 'setAdmin']);
    Route::post("admin/update-user", [ProfileController::class, 'updateUserByAdmin']);

    Route::get("profile", [ProfileController::class, 'getProfile']);
    Route::put("profile", [ProfileController::class, 'update']);
    Route::post("email-verification", [EmailVerificationController::class, 'emailVerification']);
    Route::get("email-verification", [EmailVerificationController::class, 'sendEmailVerification']);
    Route::get("logout", [LogoutAuthController::class, 'logout']);

    // Messages api
    Route::post("/messages/send", [\App\Http\Controllers\MessageController::class, 'sendMessage']);
    Route::post("/messages", [\App\Http\Controllers\MessageController::class, 'getMessagesForUser']);
});
