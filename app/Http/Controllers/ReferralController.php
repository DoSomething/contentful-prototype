<?php

namespace App\Http\Controllers;

use App\Models\Referral;
use Illuminate\Http\Request;
use App\Services\PhoenixLegacy;
use App\Repositories\PostRepository;

class ReferralController extends Controller
{
    /**
     * ReferralController constructor.
     */
    public function __construct(PostRepository $postRepository, PhoenixLegacy $phoenixLegacy)
    {
        $this->phoenixLegacy = $phoenixLegacy;
        $this->postRepository = $postRepository;

        $this->middleware('auth', ['only' => ['store']]);
    }

    /**
     * Store 'Refer a Friend' RB fields locally, then defer to regular reportback store method.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'friendName' => 'required',
            'friendEmail' => 'required',
            'friendStory' => 'required',
            'media' => 'required|file|image',
            'caption' => 'required|min:4|max:60',
            'impact' => 'required|numeric',
        ]);

        Referral::create([
            'friend_name' => $request->input('friendName'),
            'friend_email' => $request->input('friendEmail'),
            'friend_story' => $request->input('friendStory'),
            'referrer_northstar_id' => auth()->id(),
        ]);

        // Static 'why participated' to pass validation.
        $request['whyParticipated'] = 'Refer-A-Friend';

        return $this->postRepository->storeReportback($this->phoenixLegacy, $request);
    }
}
