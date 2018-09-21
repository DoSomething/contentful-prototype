<?php

namespace App\Repositories;

use Contentful\Delivery\Client as Contentful;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PageRepository
{
    use QueriesContentful;

    /**
     * Contentful client instance.
     */
    private $contentful;

    /**
     * PageRepository constructor.
     *
     * @param Contentful $contentful
     */
    public function __construct(Contentful $contentful)
    {
        $this->contentful = $contentful;
    }

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
            $page = remember($slug, 15, function () use ($slug) {
                return $this->getEntryFromSlugAsJson('page', $slug);
            });
        }

        if ($page === 'not_found') {
            throw new ModelNotFoundException;
        }

        return json_decode($page);
    }
}
