<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Log;
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

    /**
     * Store a newly created resource.
     *
     * @param  PostRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(PostRequest $request)
    {
        Log::debug('[Phoenix] PostsController@store '.$request->input('type').' submission request data:', $request->all());

        $data = $this->postRepository->storePost($request->all());

        Log::debug('[Phoenix] PostsController@store  '.$request->input('type').' submission response data:', array_except($data, 'data.signup'));

        return response()->json($data, 201);
    }
}
