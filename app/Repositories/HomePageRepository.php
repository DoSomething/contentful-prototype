<?php

namespace App\Repositories;

class HomePageRepository
{
    use QueriesContentful;

    /**
     * Get the first homepage entry.
     *
     * @return \Contentful\Delivery\Resource\Entry|null
     */
    public function getFirst()
    {
        $options = ['includeDepth' => 2, 'limit' => 1];

        if (! config('services.contentful.cache')) {
            $homePages = $this->getEntriesAsJson('homePage', $options);
        } else {
            $homePages = remember('home_pages', 15, function () use ($options) {
                return $this->getEntriesAsJson('homePage', $options);
            });
        }

        return collect(json_decode($homePages))->first();
    }
}
