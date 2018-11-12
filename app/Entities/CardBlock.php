<?php

namespace App\Entities;

use JsonSerializable;

class CardBlock extends Entity implements JsonSerializable
{
    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        $type = $this->getContentType();

        return [
            'id' => $this->entry->getId(),
            'type' => $type,
            'fields' => [
                'author' => $this->author ? new Person($this->author->entry) : null,
                'affiliateLogo' => get_image_url($this->affiliateLogo, 'logo'),
                'title' => $this->title,
                'content' => $this->content,
                'link' => $this->link,
                'metadata' => $this->metadata ? new Metadata($this->metadata->entry) : null,
            ],
        ];
    }
}
