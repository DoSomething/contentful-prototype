<?php

namespace App\Repositories;

use DoSomething\Gateway\Common\RestApiClient;

class RogueCampaignRepository extends RestApiClient
{
    /**
     * Create a new RogueCampaignRepository instance.
     */
    public function __construct()
    {
        $base_url = config('services.rogue.url').'/api/';

        parent::__construct($base_url);
    }

    /**
     * Fetch campaign from Rogue by Campaign ID.
     *
     * @param string $campaignId
     * @return array - JSON response
     */
    public function getCampaign($campaignId)
    {
        return $this->get('v3/campaigns/'.$campaignId);
    }
}
