<?php

namespace App\Repositories;

use DoSomething\Gateway\Common\RestApiClient;

class NorthstarCampaignRepository extends RestApiClient
{
    /**
     * Create a new NorthstarCampaignRepository instance.
     */
    public function __construct()
    {
        $base_url = config('services.northstar.url').'/api/';

        parent::__construct($base_url);
    }

    /**
     * Fetch campaign from Northstar by Campaign ID.
     *
     * @param string $campaignId
     * @return array - JSON response
     */
    public function getCampaign($campaignId)
    {
        return $this->get('v3/campaigns/'.$campaignId);
    }
}
