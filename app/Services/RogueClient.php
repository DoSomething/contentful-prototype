<?php

namespace App\Services;

use DoSomething\Gateway\Common\RestApiClient;

class RogueClient extends RestApiClient
{
    /**
     * Create a new RogueClient instance.
     */
    public function __construct()
    {
        $base_url = config('services.rogue.url').'/api/';

        parent::__construct($base_url);
    }
}
