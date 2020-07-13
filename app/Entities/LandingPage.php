<?php

namespace App\Entities;

use JsonSerializable;

class LandingPage extends Entity implements JsonSerializable
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
                'internalTitle' => $this->internalTitle,
                'content' => $this->content,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
