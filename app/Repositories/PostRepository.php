<?php

namespace App\Repositories;

use App\Services\RogueClient;

class PostRepository
{
    /**
     * [$rogue description]
     * @var [type]
     */
    private $rogue;

    /**
     * Create a new PostRepository instance.
     *
     * @param App\Services\RogueClient $client
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
        dd($query);

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

        // dd($query, auth()->id(), token()->role, token()->scopes);

        return $this->rogue->get('v3/posts', $query);
    }
}
