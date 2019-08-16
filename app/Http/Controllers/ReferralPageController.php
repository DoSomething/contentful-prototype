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
        $title = 'DoSomething Good with '.$firstName;
        $callToAction = $firstName.' wants to make an impact with you, and bonus, you\'ll get $5 gift certificate for completing a DoSomething campaign.';
        $facebookAppId = config('services.analytics.facebook_id');
        return response()->view('app', [
            'headTitle' => $title,
            // @TODO: Create an $entity object to pass to the get_metadata helper
            // (and refactor get_metadata helper to expect an $entity instead of $campaign)
            'metadata' => [
              'title' => $title,
              'description' => $callToAction,
              'facebook_app_id' => $facebookAppId,
              // @TODO: Replace with envelope graphic once added to beta template.
              'image' => [
                'url' => 'https://forge.dosomething.org/resources/ds-logo-landscape.png',
                'width' => '1200',
                'height' => '630',
              ],
              'url' => $request->fullUrl(),
            ],
            'socialFields' => [
              'title' => $title,
              'callToAction' => $callToAction,
              'facebookAppId' => $facebookAppId,
            ],
        ])->cacheableWhenAnonymous();
    }
}
