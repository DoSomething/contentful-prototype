<?php

namespace App\Repositories;

use App\Services\RogueClient;

class PostRepository
{
    private $rogue;

    public function __construct(RogueClient $client)
    {
        $this->rogue = $client;
    }

    public function getPosts()
    {
        //
    }

    public function getCampaignPosts($id)
    {
        dd($this->rogue);

        $response = $this->rogue->get('v1/posts', [
            'campaign_id' => $id,
        ]);

        return ['some', 'things', 'here', $id];
    }
}
