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

        $user = gateway('northstar')->getUser('id', $userId);

        if (! $user) {
            abort(404);
        }

        $firstName = $user->first_name;
        $title = 'Do Something Good With '.$firstName.'!';
        $callToAction = 'Make an impact with '.$firstName.' by completing one of DoSomething\'s volunteer campaigns. (You\'ll both double your chances of winning the campaign scholarship!)';

        return response()->view('app', [
            'headTitle' => $title,
            // @TODO: Create an $entity object to pass to the get_metadata helper
            // (and refactor get_metadata helper to expect an $entity instead of $campaign)
            'metadata' => [
              'title' => $title,
              'description' => $callToAction,
              'facebook_app_id' =>  config('services.analytics.facebook_id'),
              'image' => [
                'url' => asset('images/gift-card.png'),
                'width' => '1200',
                'height' => '1200',
              ],
              'url' => $request->fullUrl(),
            ],
        ])->cacheableWhenAnonymous();
    }
}
