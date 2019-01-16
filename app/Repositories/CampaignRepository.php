<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Entities\Campaign;
use Contentful\Delivery\Query;
use App\Entities\TruncatedCampaign;
use Contentful\Delivery\Client as Contentful;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CampaignRepository
{
    use QueriesContentful;

    /**
     * Contentful client instance.
     */
    private $contentful;

    /**
     * CampaignRepository constructor.
     *
     * @param Contentful $contentful
     */
    public function __construct(Contentful $contentful)
    {
        $this->contentful = $contentful;
    }

    /**
     * Get all campaigns.
     *
     * @param  int|null $limit
     * @param  int|null $skip
     * @return array
     */
    public function getAll($limit = null, $skip = null)
    {
        $cacheKey = 'campaigns';
        $cacheKey = $limit ? $cacheKey.':limit='.$limit : $cacheKey;
        $cacheKey = $skip ? $cacheKey.':skip='.$skip : $cacheKey;

        $options = ['includeDepth' => 1, 'limit' => $limit, 'skip' => $skip];

        $campaigns = remember($cacheKey, 15, function () use ($options) {
            return $this->getEntriesAsJson('campaign', $options);
        });

        return json_decode($campaigns);
    }

    /**
     * Get all campaigns using pagination.
     *
     * @param  int $count
     * @param  int $page
     * @return \Illuminate\Support\Collection
     */
    public function getAllCampaignsPaginated($count = 24, $page = 1)
    {
        // Return an empty collection if page is 0 or negative.
        if (intval($page) <= 0) {
            return collect();
        }

        // Calculate number to multiply count by, to get number of items to skip in collection query.
        $multiplier = intval($page) - 1;

        $skip = $count * $multiplier;

        $campaigns = $this->getAll($count, $skip);

        return collect($campaigns);
    }

    /**
     * Get all campaigns sorted by open status, and staff pick status.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllCampaignsSorted()
    {
        $campaigns = $this->getAll();

        // Partition into list of open and closed campaigns for sorting.
        list($openCampaigns, $closedCampaigns) = collect($campaigns)->partition(function ($campaign) {
            return ! $campaign->endDate || $campaign->endDate > Carbon::now();
        });

        // Sort open campaigns by staff pick.
        $sortedOpenCampaigns = $openCampaigns->sortByDesc('staffPick');

        return $sortedOpenCampaigns->merge($closedCampaigns);
    }

    /**
     * Get specified Campaign resource by its Contentful ID.
     *
     * @param  string $id
     * @return stdClass
     */
    public function getCampaign($id)
    {
        $query = (new Query)
            ->setContentType('campaign')
            ->where('sys.id', $id)
            ->setInclude(3)
            ->setLimit(1);

        $campaigns = $this->contentful->getEntries($query);

        if (! $campaigns->count()) {
            throw new ModelNotFoundException;
        }

        return new Campaign($campaigns[0]);
    }

    /**
     * Find a campaign by its ID.
     *
     * @param  string $id
     * @return stdCalss
     */
    public function findByCampaignId($id)
    {
        // @TODO let's ignore any caching for now, and eventually provide a solution that
        // can apply to more methods than just the findBySlug() used for the web app.
        $query = (new Query)
            ->setContentType('campaign')
            ->where('fields.legacyCampaignId', $id)
            ->setInclude(3)
            ->setLimit(1);

        $campaigns = $this->contentful->getEntries($query);

        if (! $campaigns->count()) {
            throw new ModelNotFoundException;
        }

        return new Campaign($campaigns[0]);
    }

    /**
     * Find a list of campaigns by their IDs.
     *
     * @param  array $ids
     * @return \Illuminate\Support\Collection
     */
    public function findByCampaignIds($ids)
    {
        if (empty($ids)) {
            return collect();
        }

        $query = (new Query)
            ->setContentType('campaign')
            ->where('fields.legacyCampaignId', $ids, 'in')
            ->setInclude(1);

        $results = $this->contentful->getEntries($query)->getItems();

        return collect($results)->mapInto(TruncatedCampaign::class);
    }

    /**
     * Find a list of campaigns by their IDs.
     *
     * @param  array $ids
     * @return \Illuminate\Support\Collection
     */
    public function findByContentfulIds($ids)
    {
        if (empty($ids)) {
            return collect();
        }

        $query = (new Query)
            ->setContentType('campaign')
            ->where('sys.id', $ids, 'in')
            ->setInclude(1);

        $results = $this->contentful->getEntries($query)->getItems();

        return collect($results)->mapInto(TruncatedCampaign::class);
    }

    /**
     * Find a campaign by its slug.
     *
     * @param  string $slug
     * @return stdClass
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findBySlug($slug)
    {
        if (! config('services.contentful.cache')) {
            $campaign = $this->getEntryFromSlugAsJson('campaign', $slug);
        } else {
            $campaign = remember('campaign_'.$slug, 15, function () use ($slug) {
                return $this->getEntryFromSlugAsJson('campaign', $slug);
            });
        }

        if ($campaign === 'not_found') {
            throw new ModelNotFoundException;
        }

        return json_decode($campaign);
    }

    /**
     * Search for all Campaigns with fields matching specified string.
     *
     * @param  string $query
     * @return array
     */
    public function searchByFullText($query)
    {
        $options = ['includeDepth' => 1, 'query' => $query];

        if (! config('services.contentful.cache')) {
            $campaigns = $this->getEntriesAsJson('campaign', $options);
        } else {
            $campaigns = remember('search_'.$query, 15, function() use ($options) {
                return $this->getEntriesAsJson('campaign', $options);
            });
        }

        return json_decode($campaigns);
    }
}
