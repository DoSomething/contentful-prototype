<?php

namespace App\Entities;

use JsonSerializable;

class PostGallery extends Entity implements JsonSerializable
{
    /**
     * Cast ActionIds as integers
     *
     * @param  array $actionIds
     * @return Collection
     */
    public function parseActionIds($actionIds)
    {
        return collect($this->actionIds)->map(function ($actionId) {
            return (int) $actionId;
        });
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
                'internalTitle' => $this->internalTitle,
                'actionIds' => $this->parseActionIds($this->actionIds),
                'itemsPerRow' => $this->itemsPerRow,
                'filterType' => $this->filterType === 'none' ? null : $this->filterType,
                'hideReactions' => $this->hideReactions,
            ],
        ];
    }
}
