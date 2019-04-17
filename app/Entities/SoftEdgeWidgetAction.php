<?php

namespace App\Entities;

use JsonSerializable;

class SoftEdgeWidgetAction extends Entity implements JsonSerializable
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
                'title' => $this->title,
                'softEdgeId' => $this->softEdgeId,
            ],
        ];
    }
}
