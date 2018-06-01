<?php

namespace App\Services;

use DoSomething\Gateway\AuthorizesWithApiKey;
use DoSomething\Gateway\Common\RestApiClient;

class Bertly extends RestApiClient
{
    use AuthorizesWithApiKey;

    /**
     * The header to provide the API key in.
     * @var string
     */
    protected $apiKeyHeader;

    /**
     * The Bertly API key.
     * @var string
     */
    protected $apiKey;

    /**
     * Bertly constructor.
     */
    public function __construct()
    {
        $base_url = config('services.bertly.url');

        // Set fields for `AuthorizesWithApiKey` trait.
        $this->apiKeyHeader = 'X-BERTLY-API-KEY';
        $this->apiKey = config('services.bertly.key');

        parent::__construct($base_url);
    }

    /**
     * Shorten a link.
     *
     * @param string $url - The URL to shorten.
     * @return string - shortened URL
     */
    public function shorten($url)
    {
        $response = $this->send('POST', '/', [
            'form_params' => [
                'url' => $url,
            ],
        ]);

        return $response['url'];
    }
}
