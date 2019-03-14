<?php

namespace App\Entities;

use JsonSerializable;

class TruncatedStoryPage extends StoryPage implements JsonSerializable
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
            'fields' => [
                'type' => $this->entry->getContentType()->getId(),
                'title' => $this->title,
                'slug' => $this->slug,
                'subTitle' => $this->subTitle,
                'coverImage' => [
                    'description' => $this->coverImage ? $this->coverImage->getDescription() : '',
                    'url' => get_image_url($this->coverImage),
                    'landscapeUrl' => get_image_url($this->coverImage, 'landscape'),
                ],
            ],
        ];
    }
}
