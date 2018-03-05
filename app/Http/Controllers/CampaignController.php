<?php

namespace App\Http\Controllers;

use Auth;
use Request;
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

        $env = get_client_environment_vars();

        // The slug argument will not contain `/blocks` or other path extensions, hence `::url()`.
        $socialFields = get_social_fields($campaign, Request::url());

        return view('campaigns.show', [
            'campaign' => $campaign,
            'socialFields' => $socialFields,
            'env' => $env,
        ])->with('state', [
            'campaign' => $campaign,
            'user' => [
                'id' => auth()->id() ?: request()->query('user_id'),
                'isAuthenticated' => auth()->check(),
                'role' => auth()->user() ? auth()->user()->role : null,
            ],
        ]);
    }
}
