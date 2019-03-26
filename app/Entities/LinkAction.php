<?php

namespace App\Entities;

use JsonSerializable;

class LinkAction extends Entity implements JsonSerializable
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
                'title' => $this->title,
                'content' => $this->content,
                'link' => $this->link,
                'buttonText' => $this->buttonText,
                'affiliateLogo' => $this->affiliateLogo ? [
                    'description' => $this->affiliateLogo->getDescription(),
                    'url' => get_image_url($this->affiliateLogo, 'logo'),
                ] : null,
                'template' => $this->template,
            ],
        ];
    }
}
