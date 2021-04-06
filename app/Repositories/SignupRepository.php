<?php

namespace App\Repositories;

use App\Services\NorthstarClient;

class SignupRepository
{
    /**
     * Northstar client instance.
     */
    private $northstar;

    /**
     * Create a new PostRepository instance.
     *
     * @param NorthstarClient $client
     */
    public function __construct(NorthstarClient $client)
    {
        $this->northstar = $client;
    }

    /**
     * Get signups from Northstar.
     *
     * @param  array  $query
     * @return array - JSON response
     */
    public function getSignups($query = [])
    {
        return $this->northstar->get('v3/signups', $query);
    }

    /**
     * Store signup in Northstar.
     *
     * @param  array  $payload
     * @return array - JSON response
     */
    public function storeSignup($payload = [])
    {
        return $this->northstar->withToken(token())->post('v3/signups', $payload);
    }
}
