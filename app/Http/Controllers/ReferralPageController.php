<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReferralPageController extends Controller
{
    /**
     * Display the beta Referral page.
     *
     * @return \Illuminate\View\View
     */
    public function show(Request $request)
    {
        $userId = $request->query('user_id');

        if (! $userId) {
            abort(404);
        }

        // Fetch user to display their first name in page metadata.
        $user = gateway('northstar')->getUser('id', $userId);

        if (! $user) {
            abort(404);
        }

        $title = 'Do Something Good With '.$user->first_name.'!';

        return response()->view('app', [
            'headTitle' => $title,
            // @TODO: Create an $entity object to pass to the get_metadata helper
            // (and refactor get_metadata helper to expect an $entity instead of $campaign)
            'metadata' => [
                'title' => $title,
                'description' => 'Make an impact with '.$user->first_name.' by completing one of DoSomething\'s volunteer campaigns. (You\'ll both increase your chances of winning the campaign scholarship!)',
                'facebook_app_id' =>  config('services.analytics.facebook_id'),
                'image' => [
                    'url' => asset('images/money-hand.png'),
                    'width' => '1200',
                    'height' => '1200',
                ],
                'url' => $request->fullUrl(),
            ],
        ])->cacheableWhenAnonymous();
    }
}
