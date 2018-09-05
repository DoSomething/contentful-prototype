<?php

namespace App\Entities;

use JsonSerializable;

class CustomBlock extends Entity implements JsonSerializable
{
    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        // Custom Block type field, which -if set- overrides the Content Type's type.
        $type = $this->entry->type;

        return [
            'id' => $this->entry->getId(),
            'type' => (is_string($type) || ! $type) ? $type : $type->first(),
            'fields' => [
                'title' => $this->title,
                'content' => $this->content,
                'displayOptions' => $this->displayOptions->first(),
                'link' => $this->link,

                // Static block additional content
                'source' => isset($this->additionalContent['source']) ? $this->additionalContent['source'] : null,

                // Reportbacks block additional content
                'count' => isset($this->additionalContent['count']) ? $this->additionalContent['count'] : null,
                'filter' => isset($this->additionalContent['filter']) ? $this->additionalContent['filter'] : null,
                'additionalContent' => $this->additionalContent,
            ],
        ];
    }
}
