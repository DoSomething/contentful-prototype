<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PhoenixLegacy;
use App\Services\UploadedMedia;
use Illuminate\Support\Facades\Log;

class ReportbackController extends Controller
{
    /**
     * The legacy Phoenix API.
     *
     * @var PhoenixLegacy
     */
    private $phoenixLegacy;

    /**
     * ReportbackController constructor.
     *
     * @todo once Rogue is ready, this will all change to request
     * Reportbacks from Rogue instead of PhoenixLegacy.
     */
    public function __construct(PhoenixLegacy $phoenixLegacy)
    {
        $this->phoenixLegacy = $phoenixLegacy;

        $this->middleware('auth')->only(['store']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json($this->phoenixLegacy->getAllReportbacks($request->query()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages = [
            'media.required' => 'An uploaded photo is required.',
            'impact.required_if' => 'The quantity field is required.',
            'impact.integer' => 'The quantity field needs to be a number.',
            'impact.min' => 'The quantity field needs to be a number greater than 0.'
        ];

        Log::info('Show Impact', [$request->input('showImpact')]);
        Log::info('Submission', $request->input());

        $this->validate($request, [
            'media' => 'required|file|image',
            'caption' => 'required|min:4|max:60',
            'impact' => 'required_if:showImpact,1|integer|min:1',
            'showImpact' => 'boolean',
            'whyParticipated' => 'required',
        ], $messages);

        $path = UploadedMedia::store($request->file('media'));

        $response = $this->phoenixLegacy->storeReportback(
            auth()->id(),
            $request->input('campaignId'),
            [
                'file_url' => config('app.env') !== 'local' ? config('app.url').'/next'.$path : 'https://placeimg.com/1000/768/animals',
                'caption' => $request->input('caption'),
                'quantity' => $request->input('impact'),
                'why_participated' => $request->input('whyParticipated'),
                'source' => 'phoenix-next',
            ]
        );

        Log::info('RB Response:', $response);

        UploadedMedia::delete($path);

        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($this->phoenixLegacy->getReportback($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        return '@todo update reportback';
    }
}
