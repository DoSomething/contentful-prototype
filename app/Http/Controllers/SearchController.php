<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\CampaignRepository;

class SearchController extends Controller
{
    /**
     * The search repository.
     *
     * @var CampaignRepository
     */
    protected $campaignRepository;

    /**
     * Make a new SearchController, inject dependencies,
     * and set middleware for this controller's methods.
     *
     * @param CampaignRepository $campaignRepository
     */
    public function __construct(CampaignRepository $campaignRepository)
    {
        $this->campaignRepository = $campaignRepository;
    }

    /**
     * Run a full-text search by given input. Display results.
     *
     * @param Request $request
     * @return array
     */
    public function __invoke(Request $request)
    {
        $query = $request->query('query');

        // Redirect empty queries to the campaign index.
        if ($query === '' || is_null($query)) {
            return redirect('/us/campaigns');
        }

        $entries = $this->campaignRepository->searchByFullText($query);

        return view('search.results', [
            'headTitle' => 'Search',
            'campaigns' => $entries,
            'query' => $query,
        ]);
    }
}
