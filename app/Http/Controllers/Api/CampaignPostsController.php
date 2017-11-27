<?php

namespace App\Http\Controllers\Api;

use App\Services\Rogue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\PostRepository;

class CampaignPostsController extends Controller
{
    private $rogue;

    private $postRepository;

    public function __construct(Rogue $rogue, PostRepository $postRepository)
    {
        $this->rogue = $rogue;

        $this->postRepository = $postRepository;
    }

    public function index($id)
    {
        $data = $this->postRepository->getCampaignPosts($id);

        return response()->json($data);
    }

    public function store($id)
    {
        return response()->json($id);
    }
}
