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
        if (! config('services.contentful.cache')) {
            $homePages = $this->getEntriesAsJson('homePage');
        } else {
            $homePages = remember('home_pages', 15, function () {
                return $this->getEntriesAsJson('homePage');
            });
        }

        return collect(json_decode($homePages))->first();
    }
}
