<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
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

        // return response()->json($data);
    }

    /**
     * Store a newly created resource.
     *
     * @param  string $id Campaign ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($id, Request $request)
    {
        $this->validate($request, [
            'media' => 'required',  //@TODO: add file|image
            'caption' => 'required|min:4|max:60',
            'impact' => 'required|integer|min:1',
            'whyParticipated' => 'required',
        ]);

        $request->merge(['campaign_id' => $id]);

        // Append the Campaign Run ID to Request if Legacy Campaign
        if (is_legacy_id($id)) {
            $legacyCampaign = $this->campaignRepository->findByLegacyCampaignId($id);
            $legacyCampaign = $legacyCampaign->jsonSerialize();

            $request->merge(['campaign_run_id' => $legacyCampaign['legacyCampaignRunId']]);
        }

        // @TODO: Rename the following items on the front-end so they more easily
        // match with the params Rogue is expecting and thus don't need to manipulate
        // these params here.
        $request->merge(['file' => $request->file('media')]);
        $request->offsetUnset('media');

        $request->merge(['quantity' => intval($request->input('impact'))]);
        $request->offsetUnset('impact');

        $request->merge(['why_participated' => $request->input('whyParticipated')]);
        $request->offsetUnset('whyParticipated');

        $data = $this->postRepository->storePost($request->all());

        return response()->json($data, 201);
    }
}
