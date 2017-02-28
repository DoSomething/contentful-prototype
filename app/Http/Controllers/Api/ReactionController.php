<?php

namespace App\Http\Controllers\Api;

use Auth;
use App\Http\Controllers\Controller;
use App\Services\PhoenixLegacy;
use Illuminate\Http\Request;

class ReactionController extends Controller
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $reportbackItemId = $request->input('reportback_item_id');
        $termId = $request->input('term_id');
        $reactionId = $request->input('reaction_id');
        $userId = Auth::user()->northstar_id;

        if ($request->input('value')) {
            return response()->json($this->phoenixLegacy->storeReaction($reportbackItemId, $termId, $userId));
        } else {
            return response()->json($this->phoenixLegacy->deleteReaction($reactionId));
        }
    }
}
