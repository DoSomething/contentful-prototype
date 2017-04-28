<?php

namespace App\Http\Controllers;

use App\Services\Gladiator;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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

        $this->middleware('auth');
    }

    /**
     * Display a listing of contest users.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function index(Request $request)
    {
        $campaignId = $request->query('campaign_id');
        $campaignRunId = $request->query('campaign_run_id');

        if (! $campaignId || ! $campaignRunId) {
            throw new BadRequestHttpException('You must provide a `campaign_id` and `campaign_run_id` query string.');
        }

        return $this->gladiator->getAllUsers([
            'id' => auth()->id(),
            'campaign_id' => $campaignId,
            'campaign_run_id' => $campaignRunId,
        ]);
    }

    /**
     * Store a user in a contest.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
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
