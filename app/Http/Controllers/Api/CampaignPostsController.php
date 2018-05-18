<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Log;
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
        $query = $request->all();

        $query['filter']['campaign_id'] = $id;

        return $this->postRepository->getPosts($id, $query);
    }

    /**
     * Store a newly created resource.
     *
     * @param  string $id Campaign ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($id, PostRequest $request)
    {
        // @TODO: temporary mechanism to pass along the legacy campaign ID and
        // legacy campaign run ID, assigning them in a single location. Eventually,
        // we want to only send the Contentful ID.
        $legacyData = json_decode($request->input('details'));

        $request->merge(['campaign_id' => $legacyData->legacy_campaign_id]);
        $request->merge(['campaign_run_id' => $legacyData->legacy_campaign_run_id]);

        // Replace above temporary mechanism with the following, once we switch to
        // Contentful only IDs:
        // $request->merge(['campaign_id' => $id]);

        Log::info('Phoenix '.$request->input('type').' submission request data:', $request->all());

        $data = $this->postRepository->storePost($request->all());

        Log::info('Phoenix '.$request->input('type').' submission response data:', array_except($data, 'data.signup'));

        return response()->json($data, 201);
    }
}
