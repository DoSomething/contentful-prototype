<?php

namespace App\Repositories;

use App\Services\RogueClient;

class SignupRepository
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
     * Get signups from Rogue.
     *
     * @param  array  $query
     * @return array - JSON response
     */
    public function getSignups($query = [])
    {
        return $this->rogue->get('v3/signups', $query);
    }

    /**
     * Store signup in Rogue.
     *
     * @param  array  $payload
     * @return array - JSON response
     */
    public function storeSignup($payload = [])
    {
        // @TODO: implement sending request to Rogue.
        return response()->json(['status' => 'working!']);
    }
}
