<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class CampaignsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return array - JSON response
     */
    public function index()
    {
        // @TODO inactive for now.
        return response()->json();
    }
}
