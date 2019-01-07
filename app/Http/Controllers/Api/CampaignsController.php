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
        $idString = array_get($request->query('filter'), 'id');

        $ids = $idString ? explode(',', $idString) : [];

        // Resetting the filter[id] param value to an array so that we can properly validate.
        $request->merge(['filter' => ['id' => $ids]]);

        $this->validate($request, [
            'filter.id' => 'max:10',
            // @TODO: potentially use a form request to do a bit more processing and
            // validate that each item in the id array is an integer.
        ]);

        $campaigns = $this->campaignRepository->findByCampaignIds($ids);

        return response()->json(['data' => $campaigns]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string $id - Rogue ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $data = $this->campaignRepository->findByCampaignId($id);

        return response()->json(['data' => $data]);
    }
}
