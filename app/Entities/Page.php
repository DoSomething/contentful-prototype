<?php

namespace App\Entities;

use JsonSerializable;

class Page extends Entity implements JsonSerializable
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
                'author' => $this->author,
                'content' => $this->content,
                'hideFromNavigation' => $this->hideFromNavigation,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
