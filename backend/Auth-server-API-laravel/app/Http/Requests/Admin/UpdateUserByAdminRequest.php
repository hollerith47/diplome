<?php

namespace App\Http\Requests\Admin;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserByAdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'admin';
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
            'phone' => 'sometimes|string|min:8|max:20',
            'status' => ['sometimes', 'string'],
            'about' => ['sometimes', 'string'],
            'gender' => ['sometimes', 'string', "max:60"],
            'birth_date' => 'sometimes|date_format:Y-m-d',
            'image' => ['sometimes','file','image', 'mimes:jpg,png,jpeg,webp', 'max:2048']
        ];
    }
}
