<?php

namespace App\Entities;

use JsonSerializable;

class CampaignUpdate extends Entity implements JsonSerializable
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
                'author' => new Staff($this->author->entry),
                'content' => $this->content,
                'displayOptions' => $this->displayOptions->first(),
                'link' => $this->link,
            ],
        ];
    }
}
