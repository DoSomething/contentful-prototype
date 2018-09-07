<?php

namespace App\Entities;

use JsonSerializable;

class Affirmation extends Entity implements JsonSerializable
{
    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        $authorValue = $this->newAuthor ?: $this->author;
        $author = null; // TODO: Migrate this field.

        if (is_string($authorValue)) {
            $author = [
                'id' => null,
                'type' => 'staff',
                'fields' => [
                    'name' => $authorValue,
                    'jobTitle' => 'Campaign Lead',
                    'photo' => null,
                ],
            ];
        } else {
            $author = $authorValue->getContentType() === 'staff' ? new Staff($authorValue->entry) : new Person($authorValue->entry);
        }

        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'header' => $this->header,
                'photo' => get_image_url($this->photo, 'square'),
                'quote' => $this->quote,
                'author' => $author,
                'callToActionHeader' => $this->callToActionHeader,
                'callToActionDescription'=> $this->callToActionDescription,
            ],
        ];
    }
}
