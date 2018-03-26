<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Controllers\Controller;
use App\Repositories\PostRepository;
use App\Repositories\CampaignRepository;

class CampaignPostsController extends Controller
{
    /**
     * The campaign repository.
     *
     * @var CampaignRepository
     */
    private $campaignRepository;

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
    public function __construct(CampaignRepository $campaignRepository, PostRepository $postRepository)
    {
        $this->middleware('auth:api')->except(['index']);

        $this->campaignRepository = $campaignRepository;

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
        return $this->postRepository->getCampaignPosts($id, $request->all());
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

        $data = $this->postRepository->storePost($request->all());

        return response()->json($data, 201);
    }
}
