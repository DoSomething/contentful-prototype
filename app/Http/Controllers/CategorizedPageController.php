<?php

namespace App\Http\Controllers;

use App\Repositories\PageRepository;

class CategorizedPageController extends Controller
{
    /**
     * The page repository.
     *
     * @var PageRepository
     */
    protected $pageRepository;

    /**
     * Make a new CategorizedPageController, inject dependencies,
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
     * @param  string  $category
     * @param  string  $slug
     * @return \Illuminate\View\View
     */
    public function show($category, $slug)
    {
        $page = $this->pageRepository->findBySlug($category.'/'.$slug);

        return view('app', [
            'socialFields' => get_social_fields($page),
            'pageTitle' => $page->fields->title,
        ])->with('state', [
            'page' => $page,
        ]);
    }
}
