<?php

namespace App\Http\Controllers;

use App\Repositories\PageRepository;

class PageController extends Controller
{
    /**
     * The page repository.
     *
     * @var PageRepository
     */
    protected $pageRepository;

    /**
     * Make a new PageController, inject dependencies,
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
        $page = $this->pageRepository->findBySlug('page', $slug);

        return view('app', [
            'headTitle' => $page->fields->title,
            'metadata' => get_metadata($page),
            'socialFields' => get_social_fields($page),
            'cacheUrl' => get_cache_url('page', $slug),
            'admin' => [
                'page' => get_page_settings($page, 'page', $slug),
            ],
        ])->with('state', [
            'page' => $page,
        ]);
    }
}
