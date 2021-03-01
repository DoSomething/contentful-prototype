<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VoterRegistrationLandingPageController extends Controller
{
    /**
     * Display the Voter Registration Landing page.
     *
     * @return \Illuminate\View\View
     */
    public function show(Request $request)
    {
        $title = 'Register to vote in less than two minutes';

        return response()->view('app', [
            'headTitle' => 'Register to Vote',
            'metadata' => [
                'title' => $title,
                'description' => 'You can register to vote online... literally right now! It\'s fast, easy, and requires only basic information like your street address. Let\'s Do This!',
                'facebook_app_id' =>  config('services.analytics.facebook_id'),
                'image' => [
                    'url' => asset('images/vr-landing-page.png'),
                    'width' => '1200',
                    'height' => '1200',
                ],
                'url' => $request->fullUrl(),
            ],
        ])->cacheableWhenAnonymous();
    }
}
