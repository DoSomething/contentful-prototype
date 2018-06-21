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

        // Resetting the filter[id] param value to an array so that we can properly validate.
        $request->query('filter')['id'] = $idsArray;

        $this->validate($request, [
            'filter.id' => 'max:10',
        ]);

        // Extract the legacy IDs.
        $legacyIds = array_filter($idsArray, 'is_legacy_id');

        // All remaining IDs are presumed to be Contentful IDs.
        $contentfulIds = array_diff($idsArray, $legacyIds);

        $legacyCampaigns = $this->campaignRepository->findByLegacyCampaignIds($legacyIds);

        $contentfulCampaigns = $this->campaignRepository->findByIds($contentfulIds);

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
