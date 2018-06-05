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
        $shortlink = $this->postForm('/', compact('url'));
        $stats = $this->get($shortlink['url'] . '/clicks');

        return [
            'url' => $shortlink['url'],
            'count' => $stats['count'],
        ];
    }

    /**
     * Send a POST request to the given URL.
     *
     * @param string $path - URL to make request to (relative to base URL)
     * @param array $payload - Body of the POST request
     * @param bool $withAuthorization - Should this request be authorized?
     * @return array
     */
    public function postForm($path, $payload = [], $withAuthorization = true)
    {
        $options = [
            'form_params' => $payload,
        ];

        return $this->send('POST', $path, $options, $withAuthorization);
    }
}
