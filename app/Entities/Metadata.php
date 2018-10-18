<?php

namespace App\Entities;

use JsonSerializable;

class Metadata extends Entity implements JsonSerializable
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
                'title' => $this->title,
                'description' => $this->description,
                'image' => get_image_url($this->image),
            ],
        ];
    }
}
