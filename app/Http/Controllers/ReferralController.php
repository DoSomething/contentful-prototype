<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Referral;
use Illuminate\Http\Request;

class ReferralController extends Controller
{

    /**
     * ReferralController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Store 'referral' action fields locally.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'firstName' => 'required',
            'email' => 'required|email',
        ]);

        $referral = Referral::create([
            'friend_name' => $request->input('firstName'),
            'friend_email' => $request->input('email'),
            'referrer_northstar_id' => auth()->id(),
        ]);

        return response()->json($referral, 201);
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
        $referralsEloquentBuilder = Referral::where('exported', false)->take(150);

        $referrals = $referralsEloquentBuilder->get();

        // Adding some referrer user details to the referral records, to be able to export them with the CSV.
        foreach ($referrals as $referral) {
            $user = gateway('northstar')->getUser('id', $referral->referrer_northstar_id);

            $referral->referrer_first_name = $user->first_name;
            $referral->referrer_last_name = $user->last_name;
            $referral->referrer_email = $user->email;
        }

        $columns = ['id', 'created_at', 'friend_name', 'friend_email', 'referrer_northstar_id', 'referrer_first_name', 'referrer_last_name', 'referrer_email'];

        $callback = function () use ($referrals, $columns, $referralsEloquentBuilder) {
            generate_streamed_csv($columns, $referrals);
            $referralsEloquentBuilder->update(['exported' => true]);
        };

        return response()->stream($callback, 200, $headers);
    }
}
