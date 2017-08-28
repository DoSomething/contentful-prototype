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
        $fields = $this->entry->jsonSerialize()->fields;

        $data = [
            'id' => $this->entry->getId(),
            'type' => $fields->type,
            'fields' => $this->entry->jsonSerialize()->fields,
        ];

        $data['fields']->displayOptions = array_shift($data['fields']->displayOptions);

        return $data;
    }
}
