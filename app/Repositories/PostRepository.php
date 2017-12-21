<?php

namespace App\Repositories;

use App\Services\RogueClient;
use Illuminate\Support\Facades\Log;
use App\Exceptions\InvalidFileUploadException;

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

    /**
     * Send reportback to Rogue for storage.
     *
     * @param \App\Services\PhoenixLegacy $client
     * @param \Illuminate\Http\Request    $request
    */
    public function storeReportback($client, $request)
    {
        $reportbackPhoto = $request->file('media');

        if (! $reportbackPhoto->isValid()) {
            throw new InvalidFileUploadException;
        }

        // Store the uploaded file.
        $path = '/uploads/'.$reportbackPhoto->store('images', 'uploads');

        $response = $client->storeReportback(
            auth()->id(),
            $request->input('campaignId'),
            [
                'file_url' => config('app.env') !== 'local' ? config('app.url').'/next'.$path : 'https://placeimg.com/1000/768/animals',
                'caption' => $request->input('caption'),
                'quantity' => $request->input('impact'),
                'why_participated' => $request->input('whyParticipated'),
                'source' => 'phoenix-next',
            ]
        );

        Log::info('RB Response:', $response);

        // Delete the uploaded file.
        app('files')->delete(public_path($path));

        return $response;
    }
}
