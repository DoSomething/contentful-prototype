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
            'title' => $this->title,
            'slug' => $this->slug,
        ];
    }
}
