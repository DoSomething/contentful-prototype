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
        /**
         * Note: We avoid querying Northstar to display user's first name because the Cypress tests
         * for this page time out.
         * @see https://github.com/DoSomething/phoenix-next/pull/1932#issuecomment-587720454
         */
        $title = 'Do Something Good With Your Friend!';
        return response()->view('app', [
            'headTitle' => $title,
            // @TODO: Create an $entity object to pass to the get_metadata helper
            // (and refactor get_metadata helper to expect an $entity instead of $campaign)
            'metadata' => [
                'title' => $title,
                'description' => 'Make an impact with your friend by completing one of DoSomething\'s volunteer campaigns. (You\'ll both increase your chances of winning the campaign scholarship!)',
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
