<?php

namespace App\Entities;

use JsonSerializable;

class StoryPage extends Entity implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'internalTitle' => $this->internalTitle,
                'title' => $this->title,
                'subTitle' => $this->subTitle,
                'slug' => $this->slug,
                'metadata' => $this->metadata ? new Metadata($this->metadata->entry) : null,
                'blocks' => $this->parseBlocks($this->blocks),
            ],
        ];
    }
}
