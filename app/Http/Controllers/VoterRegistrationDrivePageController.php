<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VoterRegistrationDrivePageController extends Controller
{
    /**
     * Display the beta OVRD page.
     *
     * @return \Illuminate\View\View
     */
    public function show(Request $request)
    {
        $title = 'Register to vote with me!';

        return response()->view('app', [
            'headTitle' => $title,
            'metadata' => [
                'title' => $title,
                'description' => 'You can register to vote online... literally right now! It\'s fast, easy, and requires only basic information like your street address. Let\'s Do This!',
                'facebook_app_id' =>  config('services.analytics.facebook_id'),
                'image' => [
                    'url' => asset('http://v.fastcdn.co/u/e971e063/50035940-0-vote.dosomething.202.jpg'),
                    'width' => '1200',
                    'height' => '1200',
                ],
                'url' => $request->fullUrl(),
            ],
        ])->cacheableWhenAnonymous();
    }
}
