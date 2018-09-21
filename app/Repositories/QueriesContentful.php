<?php

namespace App\Repositories;

use App\Entities\Page;
use App\Entities\Campaign;
use Contentful\Delivery\Query;

trait QueriesContentful
{
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

        $entry = $this->contentful->getEntries($query);

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
