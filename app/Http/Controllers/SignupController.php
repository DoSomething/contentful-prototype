<?php

namespace App\Http\Controllers;

use App\Services\Rogue;
use Illuminate\Http\Request;
use App\Services\PhoenixLegacy;
use Illuminate\Support\Facades\Log;

class SignupController extends Controller
{
    /**
     * SignupController constructor.
     *
     * @todo once Rogue is ready, this will all change to request
     * Signups from Rogue instead of PhoenixLegacy.
     */
    public function __construct(PhoenixLegacy $phoenixLegacy, Rogue $rogue)
    {
        $this->phoenixLegacy = $phoenixLegacy;
        $this->rogue = $rogue;

        $this->middleware('auth', ['only' => 'store']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        Log::info('🌲 SignupController@index()', $request->all());

        return response()->json($this->phoenixLegacy->getAllSignups($request->query()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'campaignId' => 'required',
            'campaignRunId' => 'required',
        ]);

        return $this->rogue->storeSignup(
            auth()->id(),
            $request->input('campaignId'),
            $request->input('campaignRunId'),
            'phoenix-next',
            $request->input('details')
        );
    }
}
