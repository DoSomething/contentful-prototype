<?php

namespace App\Services;

use DoSomething\Gateway\Common\RestApiClient;

class Gladiator extends RestApiClient
{
    /**
     * Gladiator constructor.
     */
    public function __construct()
    {
        $base_url = config('services.gladiator.url').'/api/';

        parent::__construct($base_url);
    }

    /**
     * Get an index of (optionally filtered) users from Gladiator.
     *
     * @param  array  $query
     * @return array - JSON response
     */
    public function getAllUsers(array $query = [])
    {
        return $this->get('v1/users', $query);
    }

    /**
     * Store a new user in contest specified by campaign id and campaign run id.
     *
     * @param  string $userId
     * @param  string $legacyCampaignId
     * @param  string $legacyCampaignRunId
     * @return array - JSON response
     */
    public function storeUserInContest(string $userId, $legacyCampaignId, $legacyCampaignRunId)
    {
        return $this->post('v1/users', [
            'id' => $userId,
            'term' => 'id',
            'campaign_id' => $legacyCampaignId,
            'campaign_run_id' => $legacyCampaignRunId,
        ]);
    }

    /**
     * Send a raw API request, without attempting to handle error responses.
     *
     * @param $method
     * @param $path
     * @param array $options
     * @param bool $withAuthorization
     * @return \GuzzleHttp\Psr7\Response
     */
    public function raw($method, $path, $options, $withAuthorization = true)
    {
        $options['headers'] = $this->defaultHeaders;

        if ($withAuthorization) {
            $options['headers']['X-DS-Gladiator-API-Key'] = config('services.gladiator.key');
        }

        return parent::raw($method, $path, $options, $withAuthorization);
    }
}
