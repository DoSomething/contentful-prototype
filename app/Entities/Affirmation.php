<?php

namespace App\Entities;

use JsonSerializable;
use Illuminate\Support\Str;

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
                'id' => Str::random(22),
                'type' => 'person',
                'fields' => [
                    'name' => $authorValue,
                    'type' => 'staff',
                    'active' => true,
                    'jobTitle' => 'Campaign Lead',
                    'email' => 'help@dosomething.org',
                    'photo' => null,
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
                'photo' => get_image_url($this->photo, 'square'),
                'quote' => $this->quote,
                'author' => $author,
                'callToActionHeader' => $this->callToActionHeader,
                'callToActionDescription'=> $this->callToActionDescription,
            ],
        ];
    }
}
