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
    public function index(Request $request)
    {
        $count = 36;
        $page = intval($request->query('page', 1));

        $campaigns = $this->campaignRepository->getAllCampaignsPaginated($count, $page);

        if (! $campaigns->count()) {
            return redirect('/us/campaigns');
        }

        return view('campaigns.index', [
            'campaigns' => $campaigns,
            'count' => $count,
            'headTitle' => 'Social Change Volunteer Opportunities',
            'nextPage' => $page + 1,
            'previousPage' => $page - 1,
        ]);
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

        return response()->view('app', [
            'admin' => [
                'page' => get_page_settings($campaign, 'campaign', $slug),
            ],
            // This is used to build campaign-specific login links in the
            // server-rendered top navigation bar.
            'campaign' => $campaign,
            'headTitle' => $campaign->title,
            'metadata' => get_metadata($campaign),
            // We render social metatags server-side because Facebook & Twitter
            // do not render JavaScript when crawling pages like Google does.
            'socialFields' => get_campaign_social_fields($campaign, $request->url()),
            'state' => [
                'campaign' => $campaign,
            ],
        ])->cacheableWhenAnonymous();
    }
}
