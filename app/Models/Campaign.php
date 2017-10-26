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
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'slug'];


    /**
     * Returns the links for this Campaign.
     *
     * @return Collection
     */
    public function links() {
        return $this->belongsToMany(Link::class);
    }

    /**
     * Parse the given campaign data and update any links
     * for this campaign.
     *
     * @param  \Entities\Campaign  $campaign
     */
    public function parseCampaignData($campaign) {
        if (! config('services.contentful.advanced_cache')) {
            return;
        }

        // Flatten the campaign entity for parsing.
        $campaign = json_decode(json_encode($campaign));

        $allLinks = find_identifiers_in_array($campaign, ['reportbacks']);
        $latestLinks = $allLinks->filter(function ($value, $key) {
            return $value !== $this->id;
        });

        $existingLinks = collect($this->links)->map(function ($link) {
            return $link->id;
        });

        $linksToMake = $latestLinks->diff($existingLinks);
        $linksToRemove = $existingLinks->diff($latestLinks);

        foreach ($linksToMake as $linkId) {
            $link = Link::firstOrCreate(['id' => $linkId]);
            $link->campaigns()->attach($this->id);
        }

        foreach ($linksToRemove as $linkId) {
            $link = Link::find($linkId);

            if ($link) {
                $link->campaigns()->detach($this->id);
            }
        }
    }
}
