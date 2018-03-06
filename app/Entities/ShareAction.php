<?php

namespace App\Entities;

use JsonSerializable;

class ShareAction extends Entity implements JsonSerializable
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
                'title' => $this->title,
                'content' => $this->content,
                'link' => $this->link,
                'affirmation' => $this->affirmation,
                'affirmationBlock' => $this->parseBlock($this->affirmationBlock),
                'socialPlatform' => $this->socialPlatform->first() ?: 'facebook',
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
