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
     * @param  string  $id Campaign ID
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id, Request $request)
    {
        $data = $this->postRepository->getCampaignPosts($id, $request->all());

        return response()->json($data);
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

        // @TODO: Probably rename impact to quantity on frontend. Made sense during
        // discussions of impact being more generic, but other services use quantity
        // so it just creates extra overhead
        $request->merge(['quantity' => intval($request->input('impact'))]);
        $request->offsetUnset('impact');

        $this->postRepository->storePost($request->all());

        return response()->json([$id], 201);
    }
}
