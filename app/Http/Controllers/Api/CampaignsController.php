<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\CampaignRepository;

class CampaignsController extends Controller
{
    /**
     * The campaign repository.
     *
     * @var CampaignRepository
     */
    private $campaignRepository;

    /**
     * Create a new CampaignController instance.
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        abort(501, 'Currently not implemented.');
    }

    /**
     * Display the specified resource.
     *
     * @param  string $id - Contentful ID or Ashes ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        if (is_legacy_id($id)) {
            $data = $this->campaignRepository->findByLegacyCampaignId($id);
        } else {
            $data = $this->campaignRepository->getCampaign($id);
        }

        return response()->json(['data' => $data]);
    }
}
