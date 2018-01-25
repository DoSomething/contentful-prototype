<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
        $previousImpact = $this->input('previousImpact');
        $impactMinMessage = 'The quantity field needs to be a number greater than 0.';

        if ($previousImpact > 0) {
            $impactMinMessage = 'The quantity needs to be greater than your previous quantity of '.$previousImpact.'.';
        }

        return [
            'media.required' => 'An uploaded photo is required.',
            'impact.required_if' => 'The quantity field is required.',
            'impact.integer' => 'The quantity field needs to be a number.',
            'impact.min' => $impactMinMessage,
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $additionalRules = [];

        if ($this->input('actionType') === 'photoUploaderAction') {
            $additionalRules = [
                'whyParticipated' => 'required',
            ];
        }

        if ($this->input('actionType') === 'referralAction') {
            $additionalRules = [
                'friendEmail' => 'required|email',
                'friendName' => 'required',
                'friendStory' => 'required',
            ];
        }

        // If we are showing the Impact Quantity field, then we adjust the minimum impact
        // based on the previous impact, but if not showing the field, then we default to
        // minimum impact of "1" since Rogue v2 endpoint still requires a value and we are
        // defaulting to a value of "1" sent via the React frontend.
        // @TODO: likely remove entire StorePostRequest once we move to Rogue v3 endpoint.
        $showImpact = intval($this->input('showImpact'));

        $minImpact = $showImpact ? $this->input('previousImpact') + 1 : 1;

        return array_merge([
            'caption' => 'required|min:4|max:60',
            'impact' => 'required_if:showImpact,1|integer|min:'.$minImpact,
            'media' => 'required|file|image',
            'showImpact' => 'boolean',
        ], $additionalRules);
    }
}
