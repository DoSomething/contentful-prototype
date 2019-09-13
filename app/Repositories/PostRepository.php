<?php

namespace App\Repositories;

use App\Services\RogueClient;

class PostRepository
{
    /**
     * Rogue client instance.
     */
    private $rogue;

    /**
     * Create a new PostRepository instance.
     *
     * @param RogueClient $client
     */
    public function __construct(RogueClient $client)
    {
        $this->rogue = $client;
    }

    /**
     * Get posts from Rogue.
     *
     * @param  array $query
     * @return array - JSON response
     */
    public function getPosts($query = [])
    {
        return $this->rogue->get('v3/posts', $query);
    }

    /**
     * Store post in Rogue.
     *
     * @param  array  $payload
     * @return array - JSON response
     */
    public function storePost($payload = [])
    {
        if (array_has($payload, 'file')) {
            unset($payload['media']);

            // Guzzle expects specific file object for multipart form.
            // @TODO: update Gateway to handle multipart form data.
            $payload['file'] = fopen($payload['file']->getPathname(), 'r');
        }

        $multipartData = collect($payload)->map(function ($value, $key) {
            if ($key === 'number_of_participants') {
                return ['name' => 'details', 'contents' => json_encode(['number_of_participants' => $value])];
            }

            return ['name' => $key, 'contents' => $value];
        })->values()->toArray();

        return $this->rogue->withToken(token())->send('POST', 'v3/posts', [
            'multipart' => $multipartData,
        ]);
    }
}
