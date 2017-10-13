<?php

namespace App\Entities;

use JsonSerializable;

class SocialOverride extends Entity implements JsonSerializable
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
                'callToAction' => $this->callToAction,
                'coverImage' => get_image_url($this->coverImage, 'landscape'),
                'quote' => $this->quote,
            ],
        ];
    }
}
