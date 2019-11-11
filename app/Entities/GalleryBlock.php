<?php

namespace App\Entities;

use JsonSerializable;

class GalleryBlock extends Entity implements JsonSerializable
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
                'blocks' => $this->parseBlocks($this->blocks),
                'itemsPerRow' => $this->itemsPerRow,
                'imageAlignment' => $this->imageAlignment ? strtoupper($this->imageAlignment) : null,
                'imageFit' => $this->imageFit ? strtoupper($this->imageFit) : null,
            ],
        ];
    }
}
