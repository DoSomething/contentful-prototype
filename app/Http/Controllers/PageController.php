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
     * Handle legacy Page routes with no taxonomy prefix
     *
     * @param string $slug
     * @return \Illuminate\View\View
     */
    public function legacyPageShow($slug)
    {
        return $this->show(null, $slug);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @return \Illuminate\View\View
     */
    public function show($prefix, $slug)
    {
        $query = $prefix ? $prefix.'/'.$slug : $slug;

        $page = $this->pageRepository->findBySlug($query);

        return view('app', [
            'socialFields' => get_social_fields($page),
            'pageTitle' => $page->fields->title,
        ])->with('state', [
            'page' => $page,
        ]);
    }
}
