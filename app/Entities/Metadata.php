<?php

namespace App\Entities;

use JsonSerializable;

class Metadata implements JsonSerializable
{
  /**
   * Convert the object into something JSON serializable.
   *
   * @return array
   */
  public function jsonSerialize()
  {
    // @TODO: using placeholers for now. Upcoming PR will flesh these out!
    return [
      'id' => str_random(24),
      'type' => 'metadata',
      'fields' => [
        'internalTitle' => null,
        'title' => null,
        'description' => null,
        'image' => null,
      ],
    ];
  }
}
