<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateUserByAdminRequest;
use App\Http\Requests\Auth\ProfileUpdateRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use App\Traits\ImageProcessing;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    use HttpResponses, ImageProcessing;
    public function update(ProfileUpdateRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = $request->user();
//        logger()->info($request->file("image"));
        $validatedData = $request->validated();

        if ($request->hasFile("image")) {
            $user->image ? $this->deleteImage($user->image) : '';
            $validatedData['image'] = $this->saveImage($request->file("image"));
        }

        $user->update($validatedData);
        $user = $user->refresh();
        $user->image ? $user->image = $user->image_url: "";
        $success["user"] = $user;
        $success["success"] = true;

        return $this->success($success, "Profile updated");
    }

    public function getProfile(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = $request->user();
        $user->image ? $user->image = $user->image_url: "";

        return response()->json([
            "success" => true,
            "data" => [
                "user"=> $request->user()
            ]
        ]);
    }

    public function updateUserByAdmin(UpdateUserByAdminRequest $request): \Illuminate\Http\JsonResponse
    {
        $validatedData = $request->validated();
        $user = User::findOrFail($request->id);
        $user->update($validatedData);
        return $this->success($user);
    }

}
