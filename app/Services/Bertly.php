<?php

namespace App\Services;

use DoSomething\Gateway\Common\RestApiClient;

class Bertly extends RestApiClient
{
    /**
     * Bertly constructor.
     */
    public function __construct()
    {
        $base_url = config('services.bertly.url');

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
            $options['headers']['X-BERTLY-API-KEY'] = config('services.bertly.key');
        }

        return parent::raw($method, $path, $options, $withAuthorization);
    }
}
