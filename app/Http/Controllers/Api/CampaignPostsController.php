<?php

namespace App\Http\Controllers\Api;

use App\Services\Rogue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\PostRepository;

class CampaignPostsController extends Controller
{
    /**
     * [$rogue description]
     * @var [type]
     */
    private $postRepository;

    /**
     * [$rogue description]
     * @var [type]
     */
    public function __construct(PostRepository $postRepository)
    {
        $this->middleware('auth:api');

        $this->postRepository = $postRepository;
    }

    /**
     * [$rogue description]
     * @var [type]
     */
    public function index($id, Request $request)
    {
        $data = $this->postRepository->getCampaignPosts($id, $request->all());

        return response()->json($data);
    }

    /**
     * [$rogue description]
     * @var [type]
     */
    public function store($id)
    {
        return response()->json($id);
    }
}
