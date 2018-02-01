<?php

namespace App\Services;

use DoSomething\Gateway\AuthorizesWithOAuth2;
use DoSomething\Gateway\Common\RestApiClient;
use DoSomething\Gateway\Exceptions\ValidationException;

class RogueClient extends RestApiClient
{
    use AuthorizesWithOAuth2;

    /**
     * Create a new RogueClient instance.
     */
    public function __construct()
    {
        $this->authorizationServerUri = config('services.northstar.url');
        $this->grant = config('services.northstar.grant');
        $this->config = config('services.northstar');
        $this->bridge = \DoSomething\Gateway\Laravel\LaravelOAuthBridge::class;

        $base_url = config('services.rogue.url').'/api/';

        parent::__construct($base_url);
    }

    /**
     * Handle validation exceptions.
     *
     * @param string $endpoint - The human-readable route that triggered the error.
     * @param array $response - The body of the response.
     * @param string $method - The HTTP method for the request that triggered the error, for optionally resending.
     * @param string $path - The path for the request that triggered the error, for optionally resending.
     * @param array $options - The options for the request that triggered the error, for optionally resending.
     * @return \GuzzleHttp\Psr7\Response|void
     * @throws UnauthorizedException
     */
    public function handleValidationException($endpoint, $response, $method, $path, $options)
    {
        $errors = $response['errors'];

        throw new ValidationException($errors, $endpoint);
    }
}
