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
                    'quantity.required_if' => 'The quantity field is required.',
                    'quantity.min' => $this->setMinQuantityMessage(),
                    'text.max' => 'The caption field may not be greater than :max characters.',
                    'text.min' => 'The caption field may not be less than :min characters.',
                    'text.required' => 'The caption field for your photo is required.',
                    'number_of_participants.integer' => 'The number of participants must be a number.',
                    'hours_spent.numeric' => 'The hours must be a number',
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
                    'quantity' => 'required_if:show_quantity,1|integer|min:1',
                    'show_quantity' => 'required|boolean',
                    'text' => 'required|min:4|max:60',
                    'why_participated' => 'required',
                    'number_of_participants' => 'integer|nullable',
                    'hours_spent' => 'numeric|nullable|min:0.1|max:999999.99',
                ];

            case 'text':
                return [
                    'text' => 'max:500',
                ];

            default:
                return [];
        }
    }

    /**
     * Set validation message for min quantity rule.
     */
    private function setMinQuantityMessage()
    {
        $previousQuantity = (int) $this->input('previousQuantity');

        return $previousQuantity
            ? 'The quantity must be greater than '.$previousQuantity.'.'
            : 'The quantity must be at least :min or greater.';
    }
}
