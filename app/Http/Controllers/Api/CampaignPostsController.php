<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Repositories\PostRepository;

class CampaignPostsController extends Controller
{
    /**
     * The post repository.
     *
     * @var PostRepository
     */
    private $postRepository;

    /**
     * Create a new CampaignPostsController instance.
     *
     * @var PostRepository $postRepository
     */
    public function __construct(PostRepository $postRepository)
    {
        $this->middleware('auth:api')->except(['index']);

        $this->postRepository = $postRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  string  $id Campaign ID
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id, Request $request)
    {
        $query = $request->all();

        $query['filter']['campaign_id'] = $id;

        return $this->postRepository->getPosts($query);
    }

    /**
     * Store a newly created resource.
     *
     * @param  string $id Campaign ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($id, PostRequest $request)
    {
        $request->merge(['campaign_id' => $id]);

        Log::info('Phoenix '.$request->input('type').' submission request data:', $request->all());

        $data = $this->postRepository->storePost($request->all());

        Log::info('Phoenix '.$request->input('type').' submission response data:', array_except($data, 'data.signup'));

        return response()->json($data, 201);
    }
}
