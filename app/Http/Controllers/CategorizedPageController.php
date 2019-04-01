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
        $contentType = get_content_type_by_category($category);

        $page = $this->pageRepository->findBySlug($contentType, $category.'/'.$slug);

        // dd([
        //     $page,
        //     config('contentful')['delivery.space'],
        //     config('contentful')['delivery.environment'],
        //     get_contentful_edit_url($page->id),
        //     get_page_settings($page, $category.'/'.$slug),
        // ]);

        return view('app', [
            'headTitle' => $page->fields->title,
            'metadata' => get_metadata($page),
            'socialFields' => get_social_fields($page),
            'cacheUrl' => get_cache_url('page', $category.'/'.$slug),
            'admin' => [
                'page' => get_page_settings($page, $category.'/'.$slug),
            ],
        ])->with('state', [
            'page' => $page,
        ]);
    }
}
