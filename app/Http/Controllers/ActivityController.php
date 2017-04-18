<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Services\PhoenixLegacy;

class ActivityController extends Controller
{
    /**
     * The legacy Phoenix API.
     *
     * @var PhoenixLegacy
     */
    protected $phoenixLegacy;

    /**
     * ActivityController constructor.
     *
     * @todo once Rogue is ready, this will all change to request
     * activity from Rogue instead of PhoenixLegacy.
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
