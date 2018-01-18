<?php

namespace App\Entities;

use JsonSerializable;

class ShareAction extends Entity implements JsonSerializable
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
                'affirmation' => $this->affirmation,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
