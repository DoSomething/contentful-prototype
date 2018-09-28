<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Entities\Campaign;
use Contentful\Delivery\Query;
use App\Services\PhoenixLegacy;
use App\Entities\LegacyCampaign;
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
     * PhoenixLegacy service instance.
     */
    private $phoenixLegacy;

    /**
     * CampaignRepository constructor.
     *
     * @param Contentful $contentful
     * @param PhoenixLegacy $phoenixLegacy
     */
    public function __construct(Contentful $contentful, PhoenixLegacy $phoenixLegacy)
    {
        $this->contentful = $contentful;

        $this->phoenixLegacy = $phoenixLegacy;
    }

    /**
     * Get all campaigns.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAll()
    {
        $campaigns = remember('campaigns', 15, function () {
            return $this->getEntriesAsJson('campaign');
        });

        return json_decode($campaigns);
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
     * Get specified Campaign resource.
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

        return new Campaign($campaigns[0]);
    }

    /**
     * Get a list of campaigns by IDs from Phoenix Ashes.
     *
     * @param  array $ids
     * @return \Illuminate\Support\Collection
     */
    public function getLegacyCampaigns($ids)
    {
        $query['ids'] = implode(',', $ids);

        $results = $this->phoenixLegacy->getCampaigns($query);

        return collect($results['data'])->mapInto(LegacyCampaign::class);
    }

    /**
     * Find a campaign by its legacy ID.
     *
     * @param  string $id
     * @return stdCalss
     */
    public function findByLegacyCampaignId($id)
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
            $legacyCampaign = $this->phoenixLegacy->getCampaign($id);

            if (! $legacyCampaign) {
                throw new ModelNotFoundException;
            }

            return new LegacyCampaign($legacyCampaign['data']);
        }

        return new Campaign($campaigns[0]);
    }

    /**
     * Find a list of campaigns by their legacy IDs.
     * Attempts to fetch campaigns from Contentful and falls back to Phoenix Ashes.
     *
     * @param  array $ids
     * @return \Illuminate\Support\Collection
     */
    public function findByLegacyCampaignIds($ids)
    {
        if (empty($ids)) {
            return collect();
        }

        $query = (new Query)
            ->setContentType('campaign')
            ->where('fields.legacyCampaignId', $ids, 'in')
            ->setInclude(1);

        $results = $this->contentful->getEntries($query)->getItems();

        $contentfulCampaigns = collect($results)->mapInto(TruncatedCampaign::class);

        // List of IDs returned from Contentful.
        $foundIds = $contentfulCampaigns->pluck('legacyCampaignId')->all();
        // Query from Phoenix Ashes using remaining IDs.
        $legacyCampaigns = $this->getLegacyCampaigns(array_diff($ids, $foundIds));

        return $contentfulCampaigns->merge($legacyCampaigns);
    }

    /**
     * Find a list of campaigns by their IDs.
     *
     * @param  array $ids
     * @return \Illuminate\Support\Collection
     */
    public function findByIds($ids)
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
            $campaign = remember($slug, 15, function () use ($slug) {
                return $this->getEntryFromSlugAsJson('campaign', $slug);
            });
        }

        if ($campaign === 'not_found') {
            throw new ModelNotFoundException;
        }

        return json_decode($campaign);
    }
}
