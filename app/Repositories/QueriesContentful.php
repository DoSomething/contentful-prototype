<?php

namespace App\Repositories;

use App\Entities\Page;
use App\Entities\Campaign;
use App\Entities\HomePage;
use Contentful\Delivery\Query;
use App\Entities\TruncatedCampaign;

trait QueriesContentful
{
    /**
     * Get entries from a Contentful Query and return data as JSON.
     *
     * @param  string $type
     * @param  array  $options
     * @param  int    $options['includeDepth']
     * @param  string $options['limit']
     * @param  string $options['skip']
     * @param  string $options['query']
     * @return string
     */
    protected function getEntriesAsJson($type, $options = [])
    {
        $query = (new Query)
                ->setContentType($type)
                ->setInclude(array_get($options, 'includeDepth', 0))
                ->orderBy('sys.updatedAt', true)
                ->setLimit(array_get($options, 'limit'))
                ->setSkip(array_get($options, 'skip'))
                ->where('query', array_get($options, 'query'));

        $entries = app('contentful.delivery')->getEntries($query)->getItems();

        switch ($type) {
            case 'campaign':
                // Using the TruncatedCampaign Entity to avoid returning a monstrous object.
                $results = collect($entries)->mapInto(TruncatedCampaign::class);

                return $results->toJson();

            case 'homePage':
                $results = collect($entries)->mapInto(HomePage::class);

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
