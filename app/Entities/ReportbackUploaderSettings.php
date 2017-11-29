<?php

namespace App\Entities;

use JsonSerializable;

class ReportbackUploaderSettings extends Entity implements JsonSerializable
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
                'moreInformation' => $this->moreInformation,
                'quantityOverride' => $this->quantityOverride,
                'reportbackAffirmation' => $this->reportbackAffirmation,
            ],
        ];
    }
}
