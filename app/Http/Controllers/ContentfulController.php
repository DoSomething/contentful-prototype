<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CampaignRepository;
use App\Models\Link;

class ContentfulController extends Controller
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
     * Recieve a webhook response.
     *
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function webhook(Request $request)
    {
        // TODO: Verify the webhook is of a certain relevant type.
        $contentfulId = $request->input('sys.id');

        $link = Link::find($contentfulId);

        if ($link) {
            // TODO: This loop should be a dispatched event.
            // Imagine updating a campaign lead bio and triggering 10 full campaign updates.
            foreach ($link->campaigns() as $campaign) {
                $this->campaignRepository->findBySlug($campaign->slug, true);
            }
        }

        return 'ok';
    }
}
