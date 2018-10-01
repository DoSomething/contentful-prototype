<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class PageRepository
{
    use QueriesContentful;

    /**
     * Find a page by its slug.
     *
     * @param  string $slug
     * @return \Contentful\Delivery\Resource\Entry
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findBySlug($slug)
    {
        if (! config('services.contentful.cache')) {
            $page = $this->getEntryFromSlugAsJson('page', $slug);
        } else {
            $page = remember('page_'.$slug, 15, function () use ($slug) {
                return $this->getEntryFromSlugAsJson('page', $slug);
            });
        }

        if ($page === 'not_found') {
            throw new ModelNotFoundException;
        }

        return json_decode($page);
    }
}
