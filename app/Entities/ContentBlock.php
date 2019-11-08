<?php

namespace App\Entities;

use JsonSerializable;

class ContentBlock extends Entity implements JsonSerializable
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
                'superTitle' => $this->superTitle,
                'title' => $this->title,
                'subTitle' => $this->subTitle,
                'content' => $this->content,
                'image' => [
                    'url' => get_image_url($this->image),
                    'description' => $this->image ? $this->image->getDescription() : null,
                ],
                'imageAlignment' => $this->imageAlignment ? strtoupper($this->imageAlignment) : null,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
