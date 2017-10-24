<?php

namespace App\Repositories;

use Cache;
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
        if (! $skipCache) {
            $cachedCampaign = Cache::get('campaign-' . $slug);

            if ($cachedCampaign) {
                return new CampaignEntity($campaigns[0]);
            }
        }

        $query = (new Query)
            ->setContentType('campaign')
            ->where('fields.slug', $slug)
            ->setInclude(3)
            ->setLimit(1);

        $campaigns = $this->makeRequest($query);

        if (! $campaigns->count()) {
            throw new ModelNotFoundException;
        }

        $campaignEntity = new CampaignEntity($campaigns[0]);
        $campaignSerialized = json_decode(json_encode($campaignEntity));
        // TODO: save `$campaignSerialized` to cache. edit: I think Mendel might have handled this already.

        $campaignModel = CampaignModel::firstOrCreate([
            'id' => $campaignSerialized->id,
            'slug' => $slug,
        ]);

        // TODO: This should be a dispatched event, so it's not blocking the HTTP request.
        $campaignModel->parseCampaignData($campaignSerialized);

        // TODO: return $campaignSerialized, update relevant functions. edit: See how Mendel made the CampaignEntity from json.
        return $campaignEntity;
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
