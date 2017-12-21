<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PhoenixLegacy;
use App\Repositories\PostRepository;

class ReportbackController extends Controller
{
    /**
     * ReportbackController constructor.
     *
     * @todo once Rogue is ready, this will all change to request
     * Reportbacks from Rogue instead of PhoenixLegacy.
     */
    public function __construct(PhoenixLegacy $phoenixLegacy, PostRepository $postRepository)
    {
        $this->phoenixLegacy = $phoenixLegacy;

        $this->postRepository = $postRepository;

        $this->middleware('auth', ['only' => ['store']]);
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
        $this->validate($request, [
            'media' => 'required|file|image',
            'caption' => 'required|min:4|max:60',
            'impact' => 'required|numeric',
            'whyParticipated' => 'required',
        ]);

        return $this->postRepository->storeReportback($this->phoenixLegacy, $request);
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
