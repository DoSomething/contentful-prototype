<?php

namespace App\Repositories;

use Illuminate\Http\Request;
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
     * Get posts for a specified campaign from Rogue.
     *
     * @param  string $id
     * @param  array $query
     * @return array - JSON response
     */
    public function getCampaignPosts($id, $query = [])
    {
        // @TODO: consolidate with getPosts() above.
        // No reason setting the campaign_id cannot happen in parent call.
        $query['filter']['campaign_id'] = $id;

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
        unset($payload['media']);

        // Guzzle expects specific file object for multipart form.
        // @TODO: upadte Gateway to handle multipart form data.
        $payload['file'] = fopen($payload['file']->getPathname(), 'r');

        $multipartData = collect($payload)->map(function ($value, $key) {
            return ['name' => $key, 'contents' => $value];
        })->values()->toArray();

        return $this->rogue->withToken(token())->send('POST', 'v3/posts', [
            'multipart' => $multipartData
        ]);
    }
}
