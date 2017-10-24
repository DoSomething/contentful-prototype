<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Returns the links for this Campaign.
     *
     * @return Collection
     */
    public function links() {
        return $this->belongsToMany(Link::class);
    }
}
