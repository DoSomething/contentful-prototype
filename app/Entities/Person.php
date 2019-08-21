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
                'type' => $this->entry->type, // $this->type would result in 'Entry' (the `sys` type) being returned (https://git.io/fx2NH).
                'active' => $this->active,
                'jobTitle' => $this->jobTitle,
                'email' => $this->email,
                'photo' => [
                  'url' => get_image_url($this->photo),
                ],
                'alternatePhoto' => get_image_url($this->alternatePhoto),
                'description' => $this->description,
                'twitterId' => $this->twitterId,
            ],
        ];
    }
}
