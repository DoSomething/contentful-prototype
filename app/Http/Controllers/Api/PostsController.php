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
     * @param PostRepository $postRepository
     */
    public function __construct(PostRepository $postRepository)
    {
        $this->middleware('auth:api')->except(['index']);

        $this->postRepository = $postRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $data = $this->postRepository->getPosts($request->all());

        return response()->json($data);
    }
}
