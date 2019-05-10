<?php

namespace App\Entities;

use JsonSerializable;

class SelectionSubmissionAction extends Entity implements JsonSerializable
{
    public function jsonSerialize()
    {
        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'actionId' => $this->actionId,
                'title' => $this->title,
                'content' => $this->content,
                'selectionFieldLabel' => $this->selectionFieldLabel,
                'selectionOptions' => $this->selectionOptions,
                'selectionPlaceholderOption' => $this->selectionPlaceholderOption,
                'buttonText' => $this->buttonText,
                'postSubmissionLabel' => $this->postSubmissionLabel,
            ],
        ];
    }
}
