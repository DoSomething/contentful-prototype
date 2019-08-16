<?php

/**
 * Set web routes for the application.
 *
 * @var \Illuminate\Routing\Router $router
 * @see \App\Providers\RouteServiceProvider
 */

// Homepage
$router->redirect('/', '/us');
$router->get('/us', 'HomePageController');

// Authentication
$router->get('us/register', 'AuthController@getRegistration')->name('register');
$router->get('next/login', 'AuthController@getLogin')->name('login');

$router->get('next/logout', 'AuthController@getLogout')->name('logout');
$router->redirect('auth/login', 'next/login'); // Fix for hard-coded redirect in Gateway! <goo.gl/2VPxDC>

// Profile
$router->redirect('/northstar/{id}', '/us/account/profile');
$router->view('/us/account/{clientRoute?}', 'app')
    ->where('clientRoute', '.*')
    ->middleware('auth');

// Campaigns index
$router->get('us/campaigns', 'CampaignController@index');
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

// Categorized Pages (articles, facts)
$categories = 'articles|facts|about|stories';

$router->get('us/{category}/{slug}', 'CategorizedPageController@show')->where('category', $categories);
$router->get('{category}/{slug}', function ($category, $slug) {
    return redirect('us/'.$category.'/'.$slug);
})->where('category', $categories);

// Referral Pages
$router->get('us/join', 'ReferralPageController@show');
$router->view('us/refer-friends', 'app');

// Blocks
$router->view('us/blocks/{id}', 'app');

// Pages
$router->get('us/{slug}', 'PageController@show');
$router->get('{slug}', function ($slug) {
    return redirect('us/'.$slug);
});

// Cache
$router->get('cache/{cacheId}', 'CacheController');

// Unknown Route Fallback
// Ensures we run through web middleware when rendering 404 pages.
$router->fallback(function () {
    return response()->view('errors.404', [], 404);
});
