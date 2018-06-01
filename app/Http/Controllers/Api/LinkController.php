<?php

namespace App\Http\Controllers\Api;

use Auth;
use App\Services\Bertly;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LinkController extends Controller
{
    /**
     * LinkController constructor.
     *
     * @param Bertly $bertly
     */
    public function __construct(Bertly $bertly)
    {
        $this->bertly = $bertly;

        $this->middleware('auth:api');
    }

    /**
     * Store a new shortened link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'url' => 'required|url',
        ]);

        // Only allow users to create short-links for
        // whitelisted "safe" sites:
        $whitelist = [
            'www.dosomething.org',
            'vote.dosomething.org',
            'www.dosomething.vote',
            'dosomething.turbovote.com',
        ];

        $url = $request->input('url');
        $host = parse_url($url, PHP_URL_HOST);
        if (in_array($host, $whitelist)) {
            $url = $this->bertly->shorten($url);
        }

        return response()->json(['url' => $url]);
    }

    /**
     * Delete a reaction.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request, $id)
    {
        return response()->json($this->phoenixLegacy->deleteReaction($id));
    }
}
