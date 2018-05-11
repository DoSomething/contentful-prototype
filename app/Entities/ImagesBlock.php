<?php

namespace App\Entities;

use JsonSerializable;

class ImagesBlock extends Entity implements JsonSerializable
{
    /**
     * Parse and extract images data.
     *
     * @param  array $images
     * @return array
     */
    public function parseImages($images)
    {
        return collect($images)->map(function ($image) {
            return get_image_url($image, 'square');
        });
    }

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
                'images' => $this->parseImages($this->images),
            ],
        ];
    }
}
