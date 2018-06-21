<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
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
    public function index(Request $request)
    {
        $ids = array_get($request->query('filter'), 'id');

        if (! $ids) {
            return response()->json(['data' => []]);
        }

        $idsArray = explode(',', $ids);

        // We limit filter[id] requests to a maximum of 10 IDs.
        if (count($idsArray) > 10) {
            return response()->json('Exceeded limit of 10 IDs', 422);
        }

        // Extract the legacy IDs.
        $legacyIds = array_filter($idsArray, 'is_legacy_id');

        // All remaining IDs are presumed to be Contentful IDs.
        $contentfulIds = array_diff($idsArray, $legacyIds);

        $legacyCampaigns = count($legacyIds) ? $this->campaignRepository->findByLegacyCampaignIds($legacyIds) : collect();

        $contentfulCampaigns = count($contentfulIds) ? $this->campaignRepository->findByIds($contentfulIds) : collect();

        $campaigns = $contentfulCampaigns->merge($legacyCampaigns);

        return response()->json(['data' => $campaigns]);
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
