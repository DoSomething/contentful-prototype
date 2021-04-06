<?php

namespace App\Repositories;

use Illuminate\Support\Arr;
use App\Services\NorthstarClient;

class PostRepository
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
     * Get posts from Northstar.
     *
     * @param  array $query
     * @return array - JSON response
     */
    public function getPosts($query = [])
    {
        return $this->northstar->get('v3/posts', $query);
    }

    /**
     * Store post in Northstar.
     *
     * @param  array  $payload
     * @return array - JSON response
     */
    public function storePost($payload = [])
    {
        if (Arr::has($payload, 'file')) {
            unset($payload['media']);

            // Guzzle expects specific file object for multipart form.
            // @TODO: update Gateway to handle multipart form data.
            $payload['file'] = fopen($payload['file']->getPathname(), 'r');
        }

        // We assign certain "informal" Northstar Post values to the details field.
        $details = array_filter([
            'number_of_participants' => collect($payload)->pull('number_of_participants'),
        ]);

        // Map the post's values into the expected multipart data format.
        $multipartData = collect($payload)->map(function ($value, $key) {
            return ['name' => $key, 'contents' => $value];
        });

        if (! empty($details)) {
            $multipartData->push(['name' => 'details', 'contents' => json_encode($details)]);
        }

        return $this->northstar->withToken(token())->send('POST', 'v3/posts', [
            'multipart' => $multipartData->values()->toArray(),
        ]);
    }
}
