<?php

namespace App\Entities;

use JsonSerializable;

class TextSubmissionAction extends Entity implements JsonSerializable
{
    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'title' => $this->title,
                'textFieldLabel' => $this->textFieldLabel,
                'textFieldPlaceholder' => $this->textFieldPlaceholder,
                'buttonText' => $this->buttonText,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
