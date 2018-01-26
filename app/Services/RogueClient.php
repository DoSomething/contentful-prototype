<?php

namespace App\Services;

use DoSomething\Gateway\AuthorizesWithOAuth2;
use DoSomething\Gateway\Common\RestApiClient;

class RogueClient extends RestApiClient
{
    use AuthorizesWithOAuth2;

    /**
     * Create a new RogueClient instance.
     */
    public function __construct()
    {
        $this->authorizationServerUri = config('NORTHSTAR_URL');

        $base_url = config('services.rogue.url').'/api/';

        parent::__construct($base_url);
    }
}
