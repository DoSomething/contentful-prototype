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
        switch($this->input('type'))
        {
            case 'text':
                return [
                    'text.required' => 'The text field with your message is required.',
                ];
        }

        return [];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        \Illuminate\Support\Facades\Log::info('PostRequest FULL:', [$this]);
        \Illuminate\Support\Facades\Log::info('PostRequest:', [$this->toArray()]);
        \Illuminate\Support\Facades\Log::info('PostRequest:', [$this->input('type')]);

        switch($this->input('type'))
        {
            case 'text':
                return [
                    'text' => 'required',
                ];
        }

        return [
            'id' => 'required',
        ];
    }
}
