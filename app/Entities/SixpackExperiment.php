<?php

namespace App\Entities;

use JsonSerializable;

class SixpackExperiment extends Entity implements JsonSerializable
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
                'alternatives' => $this->parseBlocks($this->alternatives),
                'convertableActions' => $this->convertableActions,
                'kpi' => $this->kpi,
                'title' => $this->title,
                'trafficFraction' => $this->trafficFraction, // @TODO: divide number by 100 for decimal indication.
            ],
        ];
    }
}
