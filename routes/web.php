<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Homepage
Route::redirect('/', '/us');

if (config('feature-flags.new_homepage')) {
    Route::view('/us', 'app');
} else {
    Route::get('/us', 'HomePageController');
}

// Authentication
Route::get('/authorize', 'AuthController@getAuthorization')->name('authorize');
Route::redirect('/auth/login', '/next/login', 302); // Fix for hard-coded redirect in Gateway! <goo.gl/2VPxDC>
Route::redirect('/next/login', '/authorize', 302);

Route::get('/deauthorize', 'AuthController@getDeauthorization')->name('deauthorize');
Route::redirect('/next/logout', '/deauthorize', 302);

// Profile
Route::redirect('/northstar/{id}', '/us/account');
Route::view('/us/account/{clientRoute?}', 'app')
    ->where('clientRoute', '.*')
    ->middleware('auth');

// Campaigns index
if (config('feature-flags.dynamic_explore_campaigns')) {
    Route::view('us/campaigns', 'app');
} else {
    Route::get('us/campaigns', 'CampaignController@index');
}

Route::redirect('campaigns', 'us/campaigns');

// Redirect routes for campaign specific URLs containing "/pages/".
Route::get('us/campaigns/{slug}/pages/{clientRoute?}', function ($slug, $clientRoute = '') {
    return redirect('us/campaigns/'.$slug.'/'.$clientRoute);
});

// Campaign pages
Route::get('us/campaigns/{slug}/{clientRoute?}', 'CampaignController@show')->where('clientRoute', '.*');
Route::get('campaigns/{slug}/{clientRoute?}', function ($slug, $clientRoute = '') {
    return redirect('us/campaigns/'.$slug.'/'.$clientRoute);
});

// Search
Route::get('us/search', 'SearchController');
Route::get('search', function () {
    return redirect('/us'.request()->getRequestUri());
});

// About pages
Route::view('us/about/{slug}', 'app');

// Categorized Pages (articles, facts)
$categories = 'articles|facts|stories';

Route::get('us/{category}/{slug}', 'CategorizedPageController@show')->where('category', $categories);
Route::get('{category}/{slug}', function ($category, $slug) {
    return redirect('us/'.$category.'/'.$slug);
})->where('category', $categories);

// Referral Pages
Route::get('us/join', 'ReferralPageController@show');
Route::view('us/refer-friends', 'app')
    ->middleware('auth');

// Blocks
Route::view('us/blocks/{id}', 'app');

// Voter Registration Drives
Route::get('us/my-voter-registration-drive', 'VoterRegistrationDrivePageController@show');

// Quiz Results
Route::view('us/quiz-results/{id}', 'app');

// Pages
Route::get('us/{slug}', 'PageController@show');
Route::get('{slug}', function ($slug) {
    return redirect('us/'.$slug);
});

// Cause Pages
Route::view('us/causes/{slug}', 'app');

// Collection Pages
Route::view('us/collections/{slug}', 'app');

// Cache
Route::get('cache/{cacheId}', 'CacheController');

// Unknown Route Fallback
// Ensures we run through web middleware when rendering 404 pages.
Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});
