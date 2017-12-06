<?php

namespace App\Entities;

use JsonSerializable;

class PhotoUploaderStep extends Entity implements JsonSerializable
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
            'type' => $this->entry->getContentType(),
            'fields' => [
                'informationTitle' => $this->informationTitle,
                'informationContent' => $this->informationContent,
                'showQuantityField' => $this->showQuantityField,
                'affirmationContent' => $this->affirmationContent,
            ],
        ];
    }
}
