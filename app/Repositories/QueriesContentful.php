<?php

namespace App\Repositories;

use App\Entities\Entity;
use App\Entities\HomePage;
use Illuminate\Support\Arr;
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
     * @param  string $options['query']
     * @return string
     */
    protected function getEntriesAsJson($type, $options = [])
    {
        $query = (new Query)
                ->setContentType($type)
                ->setInclude(Arr::get($options, 'includeDepth', 0))
                ->orderBy('sys.updatedAt', true)
                ->setLimit(Arr::get($options, 'limit'))
                ->where('query', Arr::get($options, 'query'));

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
     * Get a single entry from Contentful by ID.
     *
     * @param  string $id
     * @return mixed
     */
    protected function getEntryFromIdAsJson($id)
    {
        $entry = app('contentful.delivery')->getEntry($id);

        $entity = new Entity($entry);

        $block = $entity->parseBlock($entity);

        return $block;
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

        // Eg: campaign -> Campaign
        // Eg: companyPage -> CompanyPage
        // Eg: page -> Page
        $entityClass = '\\App\\Entities\\'.ucwords($type);

        return json_encode(new $entityClass($entry[0]));
    }
}
