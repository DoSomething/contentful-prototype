<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class PageRepository
{
    use QueriesContentful;

    /**
     * Find a page by its slug.
     *
     * @param  string $type
     * @param  string $slug
     * @return \Contentful\Delivery\Resource\Entry
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findBySlug($type, $slug)
    {
        if (! config('services.contentful.cache')) {
            $page = $this->getEntryFromSlugAsJson($type, $slug);
        } else {
            $page = remember(get_cache_id('page', $slug), 15, function () use ($type, $slug) {
                return $this->getEntryFromSlugAsJson($type, $slug);
            });
        }

        if ($page === 'not_found') {
            throw new ModelNotFoundException;
        }

        return json_decode($page);
    }
}
