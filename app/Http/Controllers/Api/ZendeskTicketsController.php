<?php

namespace App\Http\Controllers\Api;

use App\Services\Zendesk;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ZendeskTicketsController extends Controller
{
    /**
     * Zendesk service instance.
     *
     * @var Zendesk
     */
    private $zendesk;

    /**
     * ZendeskController constructor.
     *
     * @param Zendesk $zendesk
     */
    public function __construct(Zendesk $zendesk)
    {
        $this->middleware('auth:api');
        $this->middleware('throttle:10,60');

        $this->zendesk = $zendesk;
    }

    /**
     * Create a new Zendesk ticket.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'campaign_id' => 'required|string',
            'campaign_name' => 'required|string',
            'question' => 'required|string',
        ]);

        $zendeskTicket = $this->zendesk->createTicket(
            $request->campaign_id,
            $request->campaign_name,
            $request->question
        );

        return response()->json($zendeskTicket);
    }
}
