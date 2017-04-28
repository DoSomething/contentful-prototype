<?php

namespace App\Http\Controllers;

use App\Services\Gladiator;
use Illuminate\Http\Request;

class UserContestController extends Controller
{
    /**
     * The Gladiator API.
     *
     * @var Gladiator
     */
    private $gladiator;

    /**
     * UserContestController constructor.
     *
     * @param Gladiator $gladiator
     */
    public function __construct(Gladiator $gladiator)
    {
        $this->gladiator = $gladiator;

        $this->middleware('auth', ['only' => ['store']]);
    }

    /**
     * Display a listing of contest users.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json($this->gladiator->getAllUsers($request->query()));
    }

    /**
     * Store a user in a contest.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'legacyCampaignId' => 'required',
            'legacyCampaignRunId' => 'required',
        ]);
        dd($request->input('legacyCampaignId', 'legacyCampaignRunId'));
        return $this->gladiator->storeUserInContest(
            auth()->id(),
            $request->input('legacyCampaignId'),
            $request->input('legacyCampaignRunId')
        );
    }
}
