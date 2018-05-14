<?php

namespace App\Entities;

use JsonSerializable;

class PhotoSubmissionAction extends Entity implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'title' => $this->title,
                'captionFieldLabel' => $this->captionFieldLabel,
                'captionFieldPlaceholder' => $this->captionFieldPlaceholder,
                'showQuantityField' => $this->showQuantityField,
                'quantityFieldLabel' => $this->quantityFieldLabel,
                'quantityFieldPlaceholder' => $this->quantityFieldPlaceholder,
                'whyParticipatedFieldLabel' => $this->whyParticipatedFieldLabel,
                'whyParticipatedFieldPlaceholder' => $this->whyParticipatedFieldPlaceholder,
                'buttonText' => $this->buttonText,
                'informationTitle' => $this->informationTitle,
                'informationContent' => $this->informationContent,
                'affirmationContent' => $this->affirmationContent,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
