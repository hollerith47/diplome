<?php

namespace App\Traits;
use Illuminate\Support\Str;

trait ImageProcessing{
    public function deleteImage($filePath): void
    {
        $imagePath = public_path('uploads') . '/' . $filePath;
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    }

    public function saveImage($img): string
    {
        // $img = $request->image
        $ext = $img->getClientOriginalExtension();
        $str_random = Str::random(8);
        $img_name = $str_random.time().'.'.$ext;
        $img->move(public_path("uploads"), $img_name);

        return $img_name;
    }
}
