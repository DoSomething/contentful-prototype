<?php

namespace App\Entities;

use JsonSerializable;

class CampaignActionStep extends Entity implements JsonSerializable
{
    /**
     * Parse and extract photo data for action steps.
     *
     * @param  array $photos
     * @return array
     */
    public function parseActionStepPhotos($photos)
    {
        return collect($photos)->map(function ($photo) {
            return get_image_url($photo, 'square');
        });
    }

    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        $hideStepNumber = useOverrideIfSet(
            'hideStepNumber',
            ['hideStepNumber' => $this->hideStepNumber],
            $this->additionalContent
        );

        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'title' => $this->title,
                'displayOptions' => $this->displayOptions->first(),
                'hideStepNumber' => $hideStepNumber,
                'content' => $this->content,
                'background' => get_image_url($this->background, 'landscape'),
                'photos' => $this->parseActionStepPhotos($this->photos),
                'customType' => $this->type ?: $this->customType->first(),
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
