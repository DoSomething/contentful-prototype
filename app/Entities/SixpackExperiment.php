<?php

namespace App\Entities;

use JsonSerializable;

class SixpackExperiment extends Entity implements JsonSerializable
{
    /**
     * Parse traffic fraction to set as decimal value.
     *
     * @return int
     */
    private function parseTrafficFraction($trafficFraction)
    {
        return ($trafficFraction ?: 100) / 100;
    }

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
                'control' => $this->control ? $this->parseBlock($this->control) : null,
                'convertableActions' => $this->convertableActions,
                'kpi' => $this->kpi,
                'title' => $this->internalTitle,
                'trafficFraction' => $this->parseTrafficFraction($this->trafficFraction),
            ],
        ];
    }
}
