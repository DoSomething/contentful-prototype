<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CampaignRepository;

class ShareController extends Controller
{
    /**
     * The campaign repository.
     *
     * @var CampaignRepository
     */
    protected $campaignRepository;

    /**
     * Make a new ShareController, inject dependencies,
     * and set middleware for this controller's methods.
     *
     * @param CampaignRepository $campaignRepository
     */
    public function __construct(CampaignRepository $campaignRepository)
    {
        $this->campaignRepository = $campaignRepository;
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $slug
     * @param  Request $request
     * @return \Illuminate\View\View
     */
    public function show($slug, Request $request)
    {
        $campaign = $this->campaignRepository->findBySlug($slug);
        $socialFields = get_social_fields($campaign, $request->url());

        return view('share.show', [
            'campaign' => $campaign,
            'env' => get_client_environment_vars(),
            'socialFields' => $socialFields,
        ])->with('state', [
            'campaign' => $campaign,
            'user' => [
                'id' => $request->query('user_id', auth()->id()),
            ],
        ]);
    }
}
