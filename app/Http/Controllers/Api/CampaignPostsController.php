<?php

namespace App\Http\Controllers\Api;

use App\Services\Rogue;
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
     * @param  string  $id
     * @param  Request $request
     * @return array - JSON response
     */
    public function index($id, Request $request)
    {
        $data = $this->postRepository->getCampaignPosts($id, $request->all());

        return response()->json($data);
    }

    /**
     * Store a newly created resource.
     *
     * @param  string $id
     * @return object - JSON response
     */
    public function store($id)
    {
        // @TODO inactive for now.
        return response()->json(false);
    }
}
