<?php

namespace App\Http\Controllers;

use App\Models\Referral;
use Illuminate\Http\Request;
use App\Services\PhoenixLegacy;
use Illuminate\Support\Facades\Log;
use App\Exceptions\InvalidFileUploadException;

class ReferralController extends Controller
{
    /**
     * The legacy Phoenix API.
     *
     * @var PhoenixLegacy
     */
    private $phoenixLegacy;

    /**
     * ReferralController constructor.
     */
    public function __construct(PhoenixLegacy $phoenixLegacy)
    {
        $this->phoenixLegacy = $phoenixLegacy;

        $this->middleware('auth')->only(['store']);
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

        $reportbackPhoto = $request->file('media');

        if (! $reportbackPhoto->isValid()) {
            throw new InvalidFileUploadException;
        }

        // Store the uploaded file.
        $path = '/uploads/'.$reportbackPhoto->store('images', 'uploads');

        $path = $this->uploadedMedia->store($request->file('media'));

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

        // Delete the uploaded file.
        app('files')->delete(public_path($path));

        return $response;
    }
}
