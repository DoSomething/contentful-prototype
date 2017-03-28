<?php

namespace App\Http\Controllers;

use Auth;
use App\Repositories\CampaignRepository;
use App\Services\PhoenixLegacy;

class CampaignController extends Controller
{
    /**
     * The campaign repository.
     *
     * @var CampaignRepository
     */
    protected $campaignRepository;

    /**
     * The legacy Phoenix API.
     *
     * @var PhoenixLegacy
     */
    private $phoenixLegacy;

    /**
     * Make a new CampaignController, inject dependencies,
     * and set middleware for this controller's methods.
     *
     * @param CampaignRepository $campaignRepository
     * @param PhoenixLegacy $phoenixLegacy
     */
    public function __construct(CampaignRepository $campaignRepository, PhoenixLegacy $phoenixLegacy)
    {
        $this->campaignRepository = $campaignRepository;
        $this->phoenixLegacy = $phoenixLegacy;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $campaigns = $this->campaignRepository->getAll();

        return view('campaigns.index', ['campaigns' => $campaigns]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $slug
     * @return \Illuminate\View\View
     */
    public function show($slug)
    {
        $campaign = $this->campaignRepository->findBySlug($slug);
        $phoenixNid = data_get($campaign, 'legacyCampaignId', '1144');

        $response = $this->phoenixLegacy->getAllReportbacks([
            'campaigns' => $phoenixNid,
            'status' => 'promoted',
            'load_user' => true,
            'as_user' => auth()->id() ?: ''
        ]);

        $reportbacks = $response['data'];

        $state = [
            'campaign' => $campaign,
            'reportbacks' => [
                'data' => $reportbacks
            ],
            'user' => [
                'id' => auth()->id(),
            ],
        ];

        $shareFields = getShareFields($campaign, $campaign->socialOverrides);

        return view('campaigns.show', [
            'campaign' => $campaign,
            'shareFields' => $shareFields,
        ])->with('state', $state);
    }
}
