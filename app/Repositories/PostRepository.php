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
     * Get posts for a specified campaign from Rogue.
     *
     * @param  string $id
     * @param  array $query
     * @return array - JSON response
     */
    public function getCampaignPosts($id, $query = [])
    {
        $query['filter']['campaign_id'] = $id;

        return $this->rogue->get('v3/posts', $query);
    }

    public function storeCampaignPost()
    {
        return response()->json(['data' => ''], 201);
    }
}
