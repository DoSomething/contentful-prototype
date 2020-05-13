<?php

/**
 * Set web routes for the application.
 *
 * @var \Illuminate\Routing\Router $router
 * @see \App\Providers\RouteServiceProvider
 */

// Homepage
$router->redirect('/', '/us');

if (config('features.new_homepage')) {
    $router->view('/us', 'app');
} else {
    $router->get('/us', 'HomePageController');
}

// Authentication
$router->get('/authorize', 'AuthController@getAuthorization')->name('authorize');
$router->redirect('/auth/login', '/next/login', 302); // Fix for hard-coded redirect in Gateway! <goo.gl/2VPxDC>
$router->redirect('/next/login', '/authorize', 302);

$router->get('/deauthorize', 'AuthController@getDeauthorization')->name('deauthorize');
$router->redirect('/next/logout', '/deauthorize', 302);

// Profile
$router->redirect('/northstar/{id}', '/us/account');
$router->view('/us/account/{clientRoute?}', 'app')
    ->where('clientRoute', '.*')
    ->middleware('auth');

// Campaigns index
if (config('features.dynamic_explore_campaigns')) {
    $router->view('us/campaigns', 'app');
} else {
    $router->get('us/campaigns', 'CampaignController@index');
}

$router->redirect('campaigns', 'us/campaigns');

// Redirect routes for campaign specific URLs containing "/pages/".
$router->get('us/campaigns/{slug}/pages/{clientRoute?}', function ($slug, $clientRoute = '') {
    return redirect('us/campaigns/'.$slug.'/'.$clientRoute);
});

// Campaign pages
$router->get('us/campaigns/{slug}/{clientRoute?}', 'CampaignController@show')->where('clientRoute', '.*');
$router->get('campaigns/{slug}/{clientRoute?}', function ($slug, $clientRoute = '') {
    return redirect('us/campaigns/'.$slug.'/'.$clientRoute);
});

// Search
$router->get('us/search', 'SearchController');
$router->get('search', function () {
    return redirect('/us'.request()->getRequestUri());
});

// About pages
$router->view('us/about/{slug}', 'app');

// Categorized Pages (articles, facts)
$categories = 'articles|facts|stories';

$router->get('us/{category}/{slug}', 'CategorizedPageController@show')->where('category', $categories);
$router->get('{category}/{slug}', function ($category, $slug) {
    return redirect('us/'.$category.'/'.$slug);
})->where('category', $categories);

// Referral Pages
$router->get('us/join', 'ReferralPageController@show');
$router->view('us/refer-friends', 'app')
    ->middleware('auth');

// Blocks
$router->view('us/blocks/{id}', 'app');

// Voter Registration Drives
$router->view('us/my-voter-registration-drive', 'app');

// Quiz Results
$router->view('us/quiz-results/{id}', 'app');

// Pages
$router->get('us/{slug}', 'PageController@show');
$router->get('{slug}', function ($slug) {
    return redirect('us/'.$slug);
});

// Cause Pages
$router->view('us/causes/{slug}', 'app');

// Collection Pages
$router->view('us/collections/{slug}', 'app');

// Cache
$router->get('cache/{cacheId}', 'CacheController');

// Unknown Route Fallback
// Ensures we run through web middleware when rendering 404 pages.
$router->fallback(function () {
    return response()->view('errors.404', [], 404);
});
