<?php

namespace App\Repositories;

use Cache;
use Carbon\Carbon;
use App\Entities\Campaign as CampaignEntity;
use App\Models\Campaign as CampaignModel;
use Contentful\Delivery\Query;
use Contentful\Delivery\Client as Contentful;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CampaignRepository
{
    /**
     * CampaignRepository constructor.
     *
     * @param Contentful $contentful
     */
    public function __construct(Contentful $contentful)
    {
        $this->client = $contentful;
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
        $array = iterator_to_array($campaigns);

        return collect($array)->map(function ($entity) {
            return new CampaignEntity($entity);
        });
    }

    /**
     * Find a campaign by its slug.
     *
     * @param  string $slug
     * @param  bool   $skipCache
     * @return \App\Entities\Campaign
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findBySlug($slug, $skipCache = false)
    {
        $campaignEntry = null;
        $refreshCache = false;

        if (! $skipCache && Cache::has($slug)) {
            $campaignEntry = $this->client->reviveJson(Cache::get($slug));
        }

        if (! $campaignEntry) {
            $query = (new Query)
                ->setContentType('campaign')
                ->where('fields.slug', $slug)
                ->setInclude(3)
                ->setLimit(1);

            $campaigns = $this->makeRequest($query);

            if (! $campaigns->count()) {
                throw new ModelNotFoundException;
            }

            $campaignEntry = $campaigns[0];
            $refreshCache = true;
        }

        $campaignJson = json_encode($campaignEntry);

        if ($refreshCache && config('services.contentful.cache')) {
            $expiresAt = Carbon::now()->addMinutes(15);

            Cache::add($slug, $campaignJson, $expiresAt);
        }

        $campaignModel = CampaignModel::firstOrCreate([
            'id' => $campaignEntry->getId(),
            'slug' => $slug,
        ]);

        // TODO: This should be a dispatched event, so it's not blocking the HTTP request.
        $campaignModel->parseCampaignData(json_decode($campaignJson));

        return $campaignEntry;
    }

    /**
     * Make a request to Contentful's Delivery API.
     *
     * @param $query
     * @return \Contentful\ResourceArray
     */
    public function makeRequest($query)
    {
        $campaigns = $this->client->getEntries($query);

        return $campaigns;
    }
}
