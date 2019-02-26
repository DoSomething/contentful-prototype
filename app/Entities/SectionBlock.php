<?php

namespace App\Entities;

use JsonSerializable;

class SectionBlock extends Entity implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'internalTitle' => $this->internalTitle,
                'backgroundColor' => $this->backgroundColor,
                'textColor' => $this->textColor,
                'content' => $this->content,
            ],
        ];
    }
}
