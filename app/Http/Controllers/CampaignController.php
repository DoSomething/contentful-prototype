<?php

namespace App\Http\Controllers;

use Auth;
use App\Services\PhoenixLegacy;
use App\Repositories\CampaignRepository;

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
        $shareFields = getShareFields($campaign, $campaign->socialOverrides);
        $env = get_client_environment_vars();

        return view('campaigns.show', [
            'campaign' => $campaign,
            'shareFields' => $shareFields,
            'env' => $env,
        ])->with('state', [
            'campaign' => $campaign,
            'share' => $shareFields,
            'user' => [
                'id' => auth()->id(),
                'role' => auth()->user() ? auth()->user()->role : null,
            ],
        ]);
    }
}
