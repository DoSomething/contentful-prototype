<?php

namespace App\Http\Controllers;

use App\Repositories\PageRepository;

class VoterRegistrationMarketingPageController extends Controller
{
    /**
     * The page repository.
     *
     * @var PageRepository
     */
    protected $pageRepository;

    /**
     * Make a new VoterRegistrationMarketingPageController, inject dependencies,
     * and set middleware for this controller's methods.
     *
     * @param PageRepository $pageRepository
     */
    public function __construct(PageRepository $pageRepository)
    {
        $this->pageRepository = $pageRepository;
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\View\View
     */
    public function show($slug)
    {
        $page = $this->pageRepository->findBySlug('voterRegistrationMarketingPage', $slug);

        return response()->view('app', [
            'headTitle' => $page->fields->title,
            'metadata' => array_merge(get_metadata($page), ['url' => config('app.url').'/us/vote'.$page->fields->slug]),
            'cacheUrl' => get_cache_url('voterRegistrationMarketingPage', $slug),
            'admin' => [
                'page' => get_page_settings($page, 'voterRegistrationMarketingPage', $slug),
            ],
            'state' => [
                'page' => $page,
            ],
        ])->cacheableWhenAnonymous();
    }
}
