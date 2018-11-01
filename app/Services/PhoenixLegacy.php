<?php

namespace App\Services;

use DoSomething\Gateway\Common\RestApiClient;

class PhoenixLegacy extends RestApiClient
{
    use AuthorizesWithDrupal;

    /**
     * Mintues to retain data in cache.
     *
     * @var \DateTime|float|int
     */
    private $cacheExpiration = 30;

    /**
     * PhoenixLegacy constructor.
     */
    public function __construct()
    {
        $base_url = config('services.phoenix-legacy.url');

        parent::__construct($base_url . '/api/');
    }

    /**
     * Get details for a specific campaign from legacy Phoenix.
     *
     * @param  string $campaign_id
     * @return array - JSON response
     */
    public function getCampaign($campaign_id)
    {
        $path = 'v1/campaigns/'.$campaign_id;

        return remember(make_cache_key('legacy-'.$path), $this->cacheExpiration, function () use ($path) {
            return $this->get($path);
        });
    }

    /**
     * Get an index of (optionally filtered) campaigns from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/blob/dev/documentation/endpoints/campaigns.md#retrieve-all-campaigns
     *
     * @param array $query - query string for filtering results
     * @return array - JSON response
     */
    public function getCampaigns(array $query = [])
    {
        $path = 'v1/campaigns';

        return $this->get($path, $query);
    }

    /**
     * Get an index of (optionally filtered) campaign signups from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-signup-collection
     *
     * @param array $query - query string, for filtering results
     * @return array - JSON response
     */
    public function getAllSignups(array $query = [])
    {
        $path = 'v1/signups';

        $data = $this->get($path, $query);

        return $data;
    }
}
