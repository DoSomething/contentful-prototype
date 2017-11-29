<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\PostRepository;

class PostsController extends Controller
{
    /**
     * Post repository instance.
     */
    private $postRepository;

    /**
     * Create a new PostsController instance.
     *
     * @param \App\Repositories\PostRepository $postRepository
     */
    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    /**
     * [index description]
     * @return [type] [description]
     */
    public function index(Request $request)
    {
        $data = $this->postRepository->getPosts($request->all());

        return response()->json($data);
    }
}
