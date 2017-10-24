<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id'];

    /**
     * Returns the campaigns this link belongs too.
     *
     * @return Collection
     */
    public function campaigns() {
        return $this->belongsToMany(Campaign::class);
    }
}
