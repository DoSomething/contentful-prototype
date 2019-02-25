<?php

namespace App\Entities;

use JsonSerializable;

class PetitionSubmissionAction extends Entity implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'actionId' => $this->actionId,
                'title' => $this->title,
                'content' => $this->content,
                'textFieldPlaceholder' => $this->textFieldPlaceholder,
                'buttonText' => $this->buttonText,
                'informationTitle' => $this->informationTitle,
                'informationContent' => $this->informationContent,
                'affirmationContent' => $this->affirmationContent,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
