<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['string', 'max:60'],
            'last_name' => ['string', 'max:60'],
            'email' => 'sometimes|unique:users,email,'.$this->user()->id,
            'phone' => 'sometimes|string|min:8|max:20|unique:users,phone, '.$this->user()->id,
            'status' => ['sometimes', 'string'],
            'about' => ['sometimes', 'string'],
            'gender' => ['sometimes', 'string', "max:60"],
            'birth_date' => 'sometimes|date_format:Y-m-d',
            'image' => ['sometimes','file','image', 'mimes:jpg,png,jpeg,webp', 'max:2048']
        ];
    }
}
