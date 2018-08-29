<?php

namespace App\Entities;

use JsonSerializable;

class Person extends Entity implements JsonSerializable
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
                'type' => $this->type,
                'active' => $this->active,
                'jobTitle' => $this->jobTitle,
                'email' => $this->email,
                'photo' => get_image_url($this->photo, 'square'),
                'alternatePhoto' => get_image_url($this->alternatePhoto, 'square'),
                'description' => $this->description,
            ],
        ];
    }
}
