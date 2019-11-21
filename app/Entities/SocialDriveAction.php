<?php

namespace App\Entities;

use JsonSerializable;

class SocialDriveAction extends Entity implements JsonSerializable
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
                'link' => $this->link,
                'hidePageViews' => $this->hidePageViews,
            ],
        ];
    }
}
