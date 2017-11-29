<?php

namespace App\Services;

use DoSomething\Gateway\Common\RestApiClient;

class RogueClient extends RestApiClient
{
    /**
     * [__construct description]
     */
    public function __construct()
    {
        $base_url = config('services.rogue.url').'/api/';

        parent::__construct($base_url);
    }
}
