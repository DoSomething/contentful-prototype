<?php

namespace App\Repositories;

use App\Entities\Page;
use App\Entities\Campaign;
use Contentful\Delivery\Query;
use App\Entities\TruncatedCampaign;

trait QueriesContentful
{
    /**
     * Get entries from a Contentful Query and return data as JSON.
     *
     * @param  string $type
     * @return string
     */
    protected function getEntriesAsJson($type)
    {
        $query = (new Query)
                ->setContentType($type)
                ->setInclude(0)
                ->orderBy('sys.updatedAt', true);

        $entries = app('contentful.delivery')->getEntries($query)->getItems();

        switch ($type) {
            case 'campaign':
                // Using the TruncatedCampaign Entity to avoid returning a monstrous object.
                $results = collect($entries)->mapInto(TruncatedCampaign::class);
                return $results->toJson();
        }
    }

    /**
     * Get a single entry from a Contentful Query and return data as JSON.
     *
     * @param  string $type
     * @param  string $slug
     * @return string
     */
    protected function getEntryFromSlugAsJson($type, $slug)
    {
        $query = (new Query)
                ->setContentType($type)
                ->where('fields.slug', $slug)
                ->setInclude(3)
                ->setLimit(1);

        $entry = app('contentful.delivery')->getEntries($query);

        if (! $entry->count()) {
            return 'not_found';
        }

        switch ($type) {
            case 'campaign':
                return json_encode(new Campaign($entry[0]));

            case 'page':
                return json_encode(new Page($entry[0]));
        }
    }
}
