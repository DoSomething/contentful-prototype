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
                'alternatives' => $this->parseBlocks($this->alternatives),
                'title' => $this->title,
                'trafficFraction' => $this->trafficFraction, // @TODO: divide number by 100 for decimal indication.
            ],
        ];
    }
}
