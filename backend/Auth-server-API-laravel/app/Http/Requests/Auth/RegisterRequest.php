<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:60'],
            'last_name' => ['required', 'string', 'max:60'],
            'email' => ['required', 'string', "lowercase" ,"email", 'unique:users,email'],
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
            'role' => ['sometimes', 'string'],
            'phone' => ['sometimes', 'unique:users,phone', 'digits_between:8,20'],
            'status' => ['sometimes', 'string'],
            'about' => ['sometimes', 'string'],
            'gender' => ['sometimes', 'string'],
            'birth_date' => ['sometimes', 'string'],
        ];
    }
}
