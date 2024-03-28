<?php

namespace App\Traits;

trait AddImagePath
{
    public function updateImageAttribute(): void
    {
        if ($this->image){
            $this->image = $this->image_url;
        }
    }
}
