<?php

namespace App\Repositories;

use App\Entities\Campaign;
use Contentful\Delivery\Query;
use App\Services\PhoenixLegacy;
use App\Entities\LegacyCampaign;
use Contentful\Delivery\Client as Contentful;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CampaignRepository
{
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
        $flattenedCampaign = remember('campaigns', 15, function () {
            $query = (new Query)->setContentType('campaign')->setInclude(0);
            $campaigns = $this->contentful->getEntries($query);
            $array = iterator_to_array($campaigns);

            // Transform & cast as JSON so we can cache this. One little gotcha -
            // we don't want to grab full campaigns, that'd be a bajillion requests!
            $results = collect($array)->map(function ($entity) {
                return [
                    'id' => $entity->getId(),
                    'slug' => $entity->getSlug(),
                    'title' => $entity->getTitle(),
                    'callToAction' => $entity->getCallToAction(),
                    'coverImage' => get_image_url($entity->getCoverImage(), 'square'),
                ];
            });

            return $results->toJson();
        });

        return json_decode($flattenedCampaign);
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

            return new LegacyCampaign($legacyCampaign);
        }

        return new Campaign($campaigns[0]);
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
        $skipCache = ! config('services.contentful.cache');

        $flattenedCampaign = remember('campaign_'.$slug, 15, function () use ($slug) {
            $query = (new Query)
                ->setContentType('campaign')
                ->where('fields.slug', $slug)
                ->setInclude(3)
                ->setLimit(1);

            $campaigns = $this->contentful->getEntries($query);

            if (! $campaigns->count()) {
                return 'not_found';
            } else {
                $campaign = new Campaign($campaigns[0]);

                // Cast as JSON so we can cache this.
                return json_encode($campaign);
            }
        }, $skipCache);

        if ($flattenedCampaign == 'not_found') {
            throw new ModelNotFoundException;
        }

        return json_decode($flattenedCampaign);
    }
}
