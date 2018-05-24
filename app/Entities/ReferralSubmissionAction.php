<?php

namespace App\Entities;

use JsonSerializable;

class ReferralSubmissionAction extends Entity implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'title' => $this->title,
                'buttonText' => $this->buttonText,
                'affirmationContent' => $this->affirmationContent,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
