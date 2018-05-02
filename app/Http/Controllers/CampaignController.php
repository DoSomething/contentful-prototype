<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
     * Make a new CampaignController, inject dependencies,
     * and set middleware for this controller's methods.
     *
     * @param CampaignRepository $campaignRepository
     */
    public function __construct(CampaignRepository $campaignRepository)
    {
        $this->campaignRepository = $campaignRepository;
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
    public function show($slug, Request $request)
    {
        $campaign = $this->campaignRepository->findBySlug($slug);

        // dd($campaign);

        return view('app', [
            // This is used to build campaign-specific login links in the
            // server-rendered top navigation bar.
            'campaign' => $campaign,
            // We render social metatags server-side because Facebook & Twitter
            // do not render JavaScript when crawling pages like Google does.
            'socialFields' => get_social_fields($campaign, $request->url()),
        ])->with('state', [
            'campaign' => $campaign,
        ]);
    }
}
