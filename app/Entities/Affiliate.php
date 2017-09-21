<?php

namespace App\Entities;

use JsonSerializable;

class Affiliate extends Entity implements JsonSerializable
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
                'link' => $this->link,
                'title' => $this->title,
                'logo' => [
                    'url' => get_image_url($this->logo, 'logo'),
                    'title' => $this->logo->getTitle(),
                ],
            ],
        ];
    }
}
