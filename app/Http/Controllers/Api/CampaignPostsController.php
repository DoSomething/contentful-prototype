<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
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
     * @param  string  $campaignId
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($campaignId, Request $request)
    {
        $data = $this->postRepository->getCampaignPosts($campaignId, $request->all());

        return response()->json($data);
    }

    /**
     * Store a newly created resource.
     *
     * @param  string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($campaignId, Request $request)
    {
        $this->validate($request, [
            'media' => 'required',  //@TODO: add file|image
            'caption' => 'required|min:4|max:60',
            'impact' => 'required|integer|min:1',
            'whyParticipated' => 'required',
        ]);

        // $this->postRepository->storeCampaignPost();

        return response()->json([$campaignId], 201);
    }
}
