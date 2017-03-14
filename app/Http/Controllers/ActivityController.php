<?php

namespace App\Http\Controllers;

use Auth;
use App\Http\Controllers\Controller;
use App\Services\PhoenixLegacy;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * ReactionController constructor.
     *
     * @todo once Rogue is ready, this will all change to request
     * Reactions from Rogue instead of PhoenixLegacy.
     */
    public function __construct(PhoenixLegacy $phoenixLegacy)
    {
        $this->phoenixLegacy = $phoenixLegacy;

        $this->middleware('auth');
    }

    /**
     * Display the activity for the currently logged in user.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activity = $this->phoenixLegacy->getActivity($campaignId, auth()->id());

        return response()->json($activity);
    }

}
