<?php

namespace App\Entities;

use JsonSerializable;

class Embed extends Entity implements JsonSerializable
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
                'url' => $this->url,
                'previewImage' => $this->previewImage ? [
                    'description' => $this->previewImage->getDescription(),
                    'url' => get_image_url($this->previewImage, 'square'),
                ] : null,
            ],
        ];
    }
}
