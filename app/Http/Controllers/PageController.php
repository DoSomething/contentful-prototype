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
        $page = $this->pageRepository->findBySlug($slug);

        // return view('app')->with('state', [
        //     'page' => $page,
        // ]);

        return response('Hang Tight! We\'ll have static pages up and running in a jiffy!', 501)
            ->header('Content-Type', 'text/plain');
    }
}
