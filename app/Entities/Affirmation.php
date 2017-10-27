<?php

namespace App\Entities;

use JsonSerializable;

class Affirmation extends Entity implements JsonSerializable
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
                'header' => $this->header,
                'photo' => get_image_url($this->photo, 'logo'),
                'author' => $this->author,
                'quote' => $this->quote,
                'callToActionHeader' => $this->callToActionHeader,
                'callToActionDescription' => $this->callToActionDescription,
            ],
        ];
    }
}
