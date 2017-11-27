<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostsController extends Controller
{
    public function __construct()
    {
        //
    }

    public function index()
    {
        return response()->json('index: Booya! List of all posts!');
    }
}
