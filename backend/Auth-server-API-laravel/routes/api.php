<?php

use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginAuthController;
use App\Http\Controllers\Auth\LogoutAuthController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\RegisterAuthController;
use App\Http\Controllers\Auth\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("register", [RegisterAuthController::class, 'register']);
Route::post("login", [LoginAuthController::class, 'login']);

Route::post("forgot-password", [ForgotPasswordController::class, 'forgotPassword']);
Route::post("reset-password", [ResetPasswordController::class, 'passwordReset']);

Route::middleware(['auth:sanctum'])->group(function (){
    Route::get("profile", [ProfileController::class, 'getProfile']);
    Route::put("profile", [ProfileController::class, 'update']);
    Route::post("email-verification", [EmailVerificationController::class, 'emailVerification']);
    Route::get("email-verification", [EmailVerificationController::class, 'sendEmailVerification']);
    Route::get("logout", [LogoutAuthController::class, 'logout']);
});
