<?php

namespace App\Entities;

use JsonSerializable;

class SixpackExperiment extends Entity implements JsonSerializable
{
    public function jsonSerializable()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'title' => $this->title,
                'alternatives' => $this->parseBlocks($this->alternatives),
            ],
        ];
    }
}
