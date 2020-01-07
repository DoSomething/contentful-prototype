<?php

namespace App\Entities;

use JsonSerializable;

class CurrentSchoolBlock extends Entity implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'internalTitle' => $this->internalTitle,
                'selectSchoolTitle' => $this->selectSchoolTitle,
                'selectSchoolDescription' => $this->selectSchoolDescription,
                'currentSchoolTitle' => $this->currentSchoolTitle,
                'currentSchoolDescription' => $this->currentSchoolDescription,
                'schoolNotAvailableDescription' => $this->schoolNotAvailableDescription,
            ],
        ];
    }
}
