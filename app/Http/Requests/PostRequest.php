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
            case 'text':
                return [
                    'text.required' => 'The text field with your message is required.',
                    'text.max' => 'The message may not be greater than :max characters.',
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
                    'media' => 'required',  //@TODO: add file|image
                    'caption' => 'required|min:4|max:60',
                    'impact' => 'required|integer|min:1',
                    'whyParticipated' => 'required',
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
