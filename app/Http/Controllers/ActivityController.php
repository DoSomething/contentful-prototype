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
     * Display the activity for the currently logged in user
     * and given campaign id.
     *
     * @param  string  $campaignId
     * @return \Illuminate\Http\Response
     */
    public function show($campaignId)
    {
        $activity = $this->phoenixLegacy->getActivity(auth()->id(), $campaignId);

        return response()->json($activity);
    }

}
