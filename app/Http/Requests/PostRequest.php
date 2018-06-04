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
                    'quantity.min' => $this->getMinQuantityMessage(),
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
                return $this->getPhotoRules();

            case 'text':
                return [
                    'text' => 'required|max:256',
                ];

            default:
                return [];
        }
    }

    /**
     * Get the validation rules for a photo post.
     *
     * @return array
     */
    private function getPhotoRules()
    {
        $rules = [
            'file' => 'required|file|image',
            'show_quantity' => 'required|boolean',
            'text' => 'required|min:4|max:60',
            'why_participated' => 'required',
        ];

        if (filter_var($this->input('show_quantity'), FILTER_VALIDATE_BOOLEAN)) {
            $rules += [
                'quantity' => 'required|integer|min:1',
            ];
        }

        return $rules;
    }

    /**
     * Get validation message for min quantity rule.
     */
    private function getMinQuantityMessage()
    {
        $previousQuantity = (int) $this->input('previousQuantity');

        return $previousQuantity
            ? 'The quantity must be greater than '.$previousQuantity.'.'
            : 'The quantity must be at least :min or greater.';
    }
}
