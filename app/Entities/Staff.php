<?php

namespace App\Entities;

use JsonSerializable;

class Staff extends Entity implements JsonSerializable
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
                'name' => $this->name,
                'jobTitle' => $this->jobTitle,
                'avatar' => get_image_url($this->avatar, 'square'),
            ],
        ];
    }
}
