<?php

namespace App\Repositories;

use App\Entities\Page;
use Contentful\Delivery\Query;
use Contentful\Delivery\Client as Contentful;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PageRepository
{
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
     * @return object
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function findBySlug($slug)
    {
        $query = (new Query)
            ->setContentType('page')
            ->where('fields.slug', $slug)
            ->setInclude(1)
            ->setLimit(1);

        $pages = $this->contentful->getEntries($query);

        if (! $pages->count()) {
            throw new ModelNotFoundException;
        }

        return new Page($pages[0]);
    }
}
