<?php

namespace App\Entities;

use JsonSerializable;

class CampaignDashboard extends Entity implements JsonSerializable
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
                'shareHeader' => $this->shareHeader,
                'shareCopy' => $this->shareCopy,
                'firstValue' => $this->firstValue,
                'firstDescription' => $this->firstDescription,
                'secondValue' => $this->secondValue,
                'secondDescription' => $this->secondDescription,
            ],
        ];
    }
}
