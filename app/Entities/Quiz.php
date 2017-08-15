<?php

namespace App\Entities;

use JsonSerializable;

class Quiz extends Entity implements JsonSerializable
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
                'slug' => $this->slug,
                'json' => $this->json,
            ],
        ];
    }
}
