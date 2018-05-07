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
                    'text.max' => 'The caption field may not be greater than :max characters.',
                    'text.min' => 'The caption field may not be less than :min characters.',
                    'text.required' => 'The caption field for your photo is required.',
                ];

            case 'text':
                return [
                    'text.max' => 'The message may not be greater than :max characters.',
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
                    'quantity' => 'required|integer|min:1',
                    'text' => 'required|min:4|max:60',
                    'why_participated' => 'required',
                    'preventSubmission' => 'required',
                ];

            case 'text':
                return [
                    'text' => 'required|max:256',
                ];

            default:
                return [];
        }
    }
}
