<?php

namespace App\Repositories;

use Contentful\Delivery\Query;
use Contentful\ResourceArray;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CampaignRepository
{
    protected $shouldSnapshot;

    public function __construct($snapshot = false)
    {
        $this->shouldSnapshot = $snapshot;
    }

    /**
     * Get all campaigns.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAll()
    {
        $query = (new Query)->setContentType('campaign');

        $campaigns = $this->makeRequest($query);

        return collect(iterator_to_array($campaigns));
    }

    /**
     * Find a campaign by its slug.
     *
     * @param  string $slug
     * @return \Contentful\Delivery\DynamicEntry
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findBySlug($slug)
    {
        $query = (new Query)
            ->setContentType('campaign')
            ->where('fields.slug', $slug)
            ->setLimit(1);

        $campaigns = $this->makeRequest($query);

        if (! $campaigns->count()) {
            throw new ModelNotFoundException;
        }

        $campaign = $campaigns[0];
        $campaign->setLocale(app()->getLocale());

        return $campaign;
    }

    /**
     * Make a request to the Contentful API.
     *
     * @param $query
     * @return \Contentful\ResourceArray
     */
    public function makeRequest(Query $query) {
        $client = $this->getClient();

        if ($this->shouldSnapshot) {
            return $this->returnSnapshotForRequest($query);
        }

        $campaigns = $client->getEntries($query);
        return $campaigns;
    }

    /**
     * Return a snapshot for the given query.
     *
     * @param Query $query
     * @return mixed
     */
    public function returnSnapshotForRequest(Query $query)
    {
        $contentType = $query->getContentType();
        $hash = md5(serialize($query->getQueryData()));

        $snapshotPath = base_path('tests/snapshots/' . $contentType . '-' . $hash . '.json');

        if (! file_exists($snapshotPath)) {
            file_put_contents($snapshotPath, json_encode($this->getClient()->getEntries($query), JSON_PRETTY_PRINT));
        }

        $json = file_get_contents($snapshotPath);

        return $this->getClient()->reviveJson($json);
    }

    /**
     * Get instance of the Contentful delivery client.
     *
     * @return \Contentful\Delivery\Client
     */
    public function getClient()
    {
        return app('contentful.delivery');
    }

    /**
     * Determine if the specified campaign is active.
     *
     * @param  \Contentful\Delivery\DynamicEntry  $campaign
     * @return boolean
     */
    public static function isActive($campaign)
    {
        return $campaign->getActive();
    }
}
