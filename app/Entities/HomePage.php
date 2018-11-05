<?php

namespace App\Entities;

use JsonSerializable;

class HomePage extends Entity implements JsonSerializable
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
                'internalTitle' => $this->internalTitle,
                'title' => $this->title,
                'subTitle' => $this->subTitle,
                'blocks' => $this->parseBlocks($this->blocks),
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
