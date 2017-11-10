<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class CampaignsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index()
    {
        // Cache the total user count for 15 minutes so we can make fast cursor-based
        // queries, but still show the total number of records to admins.
        $total = remember('users.count.'.auth()->id(), 15, function () {
            return gateway('northstar')->withToken(token())->getAllUsers()->total();
        });

        return ['total' => number_format($total)];
    }
}
