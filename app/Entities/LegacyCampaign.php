<?php

namespace App\Entities;

use JsonSerializable;

class LegacyCampaign implements JsonSerializable
{
    /**
     * The data for the legacy campaign.
     *
     * @var array
     */
    protected $legacyCampaign;

    /**
     * Create instance of the LegacyCampaign class.
     *
     * @param array $legacyCampaign
     */
    public function __construct($legacyCampaign)
    {
        $this->legacyCampaign = $legacyCampaign;
    }

    /**
     * Parse the cover image data.
     *
     * @param  array $coverImage
     * @return array
     */
    public function parseCoverImage($coverImage)
    {
        return [
            'description' => null,
            'url' => array_get($coverImage, 'default.uri', null),
            'landscapeUrl' => array_get($coverImage, 'default.sizes.landscape.uri', null),
        ];
    }

    /**
     * Parse the campaign run ID.
     *
     * @param  array $campaignRuns
     * @return string
     */
    public function parseCampaignRunId($campaignRuns)
    {
        $current = array_shift($campaignRuns['current']);

        return $current['id'];
    }

    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => null,
            'legacyCampaignId' => $this->legacyCampaign['id'],
            'legacyCampaignRunId' => $this->parseCampaignRunId($this->legacyCampaign['campaign_runs']),
            'type' => 'campaign',
            'title' => $this->legacyCampaign['title'],
            'slug' => null,
            'status' => $this->legacyCampaign['status'],
            'callToAction' => $this->legacyCampaign['tagline'],
            'tagline' => $this->legacyCampaign['tagline'],
            'coverImage' => $this->parseCoverImage($this->legacyCampaign['cover_image']),
            'staffPick' => $this->legacyCampaign['staff_pick'],
            'cause' => $this->legacyCampaign['causes']['primary']['name'],
            'additionalContent' => [
                'noun' => [
                    'singular' => null,
                    'plural' => $this->legacyCampaign['reportback_info']['noun'],
                ],
                'verb' => [
                    'singular' => null,
                    'plural' => $this->legacyCampaign['reportback_info']['verb'],
                ],
            ],
        ];
    }
}
