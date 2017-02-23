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
        $phoenixNid = data_get($campaign, 'legacy_campaign_id', '1283');

        $response = $this->phoenixLegacy->getAllReportbacks(['campaigns' => $phoenixNid, 'status' => 'promoted', 'load_user' => true, 'as_user' => Auth::user()->northstar_id]);
        $reportbacks = $response['data'];

        return view('campaigns.show', ['campaign' => $campaign])
            ->with('state', ['campaign' => $campaign, 'reportbacks' => $reportbacks]);
    }
}
