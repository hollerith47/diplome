<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    use HttpResponses;
    public function getUsers(): \Illuminate\Http\JsonResponse
    {
        $users = User::all();
        $users->each(function ($user){
            $user->updateImageAttribute();
        });
        return $this->success($users);
    }

    public function show(Request $request)
    {
        $user = $request->user();
        $user->updateImageAttribute();
        return response()->json($user);
    }
}
