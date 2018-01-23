<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Referral;
use Illuminate\Http\Request;
use App\Services\PhoenixLegacy;
use App\Services\UploadedMedia;
use Illuminate\Support\Facades\Log;

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

        $this->middleware('auth');
    }

    /**
     * Store 'Refer a Friend' RB fields locally, then store regular reportback fields through the PhoenixLegacy API.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'friendName' => 'required',
            'friendEmail' => 'required|email',
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

    public function csvExport()
    {
        // Only allowing administrators to perform the CSV export.
        if (! auth()->user()->isAdmin()) {
            return redirect('/');
        }

        $fileName = 'referrals_export_'.Carbon::now().'.csv';

        $headers = [
            'Content-type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => 'attachment; filename='.$fileName,
        ];

        // Save the eloquent builder object so that we can efficiently update the records as "exported".
        $referralsEloquentBuilder = Referral::where('exported', false);

        $referrals = $referralsEloquentBuilder->get();

        $columns = ['id', 'created_at', 'friend_name', 'friend_email', 'friend_story', 'referrer_northstar_id'];

        $callback = function () use ($referrals, $columns, $referralsEloquentBuilder) {
            generate_streamed_csv($columns, $referrals);
            $referralsEloquentBuilder->update(['exported' => true]);
        };

        return response()->stream($callback, 200, $headers);
    }
}
