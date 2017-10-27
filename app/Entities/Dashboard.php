<?php

namespace App\Entities;

use JsonSerializable;

class Dashboard extends Entity implements JsonSerializable
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
                'firstValue' => $this->firstValue,
                'firstDescription' => $this->firstDescription,
                'secondValue' => $this->secondValue,
                'secondDescription' => $this->secondDescription,
                'shareHeader' => $this->shareHeader,
                'shareCopy' => $this->shareCopy,
            ],
        ];
    }
}
