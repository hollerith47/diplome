<?php

namespace App\Http\Requests\Auth;

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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:60'],
            'last_name' => ['required', 'string', 'max:60'],
            'email' => 'required|unique:users,email,'.$this->user()->id,
            'phone' => 'sometimes|digits_between:8,20|unique:users,phone, '.$this->user()->id,
            'status' => ['sometimes', 'string'],
            'about' => ['sometimes', 'string'],
            'gender' => ['sometimes', 'string', "max:60"],
            'birth_date' => 'sometimes|date_format:Y-m-d',
            'image' => ['image', 'mimes:jpg,png,jpeg,webp', 'max:2048']
        ];
    }
}
