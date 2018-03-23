<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        // Custom validation rule messaging based on the type of post action.
        switch ($this->input('type')) {
            case 'photo':
                return [
                    'file.required' => 'An uploaded photo is required.',
                    'quantity.integer' => 'The quantity field needs to be a number.',
                    'quantity.min' => 'The quantity field needs to be a number greater than 0.',
                    'text.required' => 'Please provide a caption for your photo.',
                    'why_participated.required' => 'Please tell us why you participated.',
                ];

            case 'text':
                return [
                    'text.required' => 'The text field with your message is required.',
                ];

            default:
                return [];
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // Custom validation rules based on the type of post action.
        switch ($this->input('type')) {
            case 'photo':
                return [
                    'file' => 'required|file|image',
                    'quantity' => 'integer|min:1',
                    'text' => 'required|min:4|max:60',
                    'why_participated' => 'required',
                ];

            case 'text':
                return [
                    'text' => 'required',
                ];

            default:
                return [];
        }
    }
}
