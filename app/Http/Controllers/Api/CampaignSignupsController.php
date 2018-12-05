<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Repositories\SignupRepository;

class CampaignSignupsController extends Controller
{
    /**
     * The post repository.
     *
     * @var SignupRepository
     */
    private $signupRepository;

    /**
     * Create a new CampaignSignupsController instance.
     *
     * @var SignupRepository $signupRepository
     */
    public function __construct(SignupRepository $signupRepository)
    {
        $this->middleware('auth:api')->except(['index']);

        $this->signupRepository = $signupRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  string  $id Campaign ID
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id, Request $request)
    {
        $query = $request->all();

        $query['filter']['campaign_id'] = $id;

        Log::debug('[Phoenix] CampaignSignupsController@index request data:', $query);

        $data = $this->signupRepository->getSignups($query);

        Log::debug('[Phoenix] CampaignSignupsController@index response data:', $data);

        return $data;
    }

    /**
     * Store a newly created resource.
     *
     * @param  string  $id
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($id, Request $request)
    {
        $request->merge(['campaign_id' => $id]);

        $request->validate([
            'campaign_id' => 'required',
            'details' => 'string',
        ]);

        Log::debug('[Phoenix] CampaignSignupsController@store request data:', $request->all());

        $data = $this->signupRepository->storeSignup($request->all());

        Log::debug('[Phoenix] CampaignSignupsController@store response data:', $data);

        return $data;
    }
}
