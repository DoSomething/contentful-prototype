<?php

namespace App\Http\Controllers;

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
     * Store a reaction.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'reportback_item_id' => 'required|string',
            'term_id' => 'required|string',
        ]);

        $reaction = $this->phoenixLegacy->storeReaction(
            $request->input('reportback_item_id'),
            $request->input('term_id'),
            Auth::user()->northstar_id
        );

        return response()->json($reaction);
    }

    /**
     * Delete a reaction.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request, $id)
    {
        return response()->json($this->phoenixLegacy->deleteReaction($id));
    }
}
