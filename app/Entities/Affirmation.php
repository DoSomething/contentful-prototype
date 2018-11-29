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
                'id' => str_random(22),
                'type' => 'person',
                'fields' => [
                    'name' => $authorValue,
                    'type' => 'staff',
                    'active' => true,
                    'jobTitle' => 'Campaign Lead',
                    'email' => 'help@dosomething.org',
                    'photo' => get_image_url($this->photo, 'square'),
                    'alternatePhoto' => null,
                    'description' => null,
                ],
            ];
        } else {
            $author = new Person($authorValue->entry);
        }

        return [
            'id' => $this->entry->getId(),
            'type' => $this->getContentType(),
            'fields' => [
                'header' => $this->header,
                'quote' => $this->quote,
                'author' => $author,
                'callToActionHeader' => $this->callToActionHeader,
                'callToActionDescription'=> $this->callToActionDescription,
            ],
        ];
    }
}
