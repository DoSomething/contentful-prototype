<?php

/**
 * Set web routes for the application.
 *
 * @var \Illuminate\Routing\Router $router
 * @see \App\Providers\RouteServiceProvider
 */

// Homepage
$router->redirect('/', 'us/campaigns');
$router->redirect('/us', 'us/campaigns');

// Authentication
$router->get('next/login', 'AuthController@getLogin')->name('login');
$router->get('next/logout', 'AuthController@getLogout')->name('logout');
$router->redirect('auth/login', 'next/login'); // Fix for hard-coded redirect in Gateway! <goo.gl/2VPxDC>

// Profile
$router->redirect('/northstar/{id}', '/us/account/profile');
$router->get('/us/account/{slug}', function () {
    return auth()->user() ? view('app') : redirect('/next/login');
})->where('slug', 'campaigns|profile');

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

// Categorized Pages (articles, facts)
$router->get('us/{category}/{slug}', 'CategorizedPageController@show')->where('category', 'articles|facts');
$router->get('{category}/{slug}', function ($category, $slug) {
    return redirect('us/'.$category.'/'.$slug);
})->where('category', 'articles|facts');

// Pages
$router->get('us/{slug}', 'PageController@show');
$router->get('{slug}', function ($slug) {
    return redirect('us/'.$slug);
});

// Campaigns cache clear
$router->get('next/cache/{cacheId}', 'CacheController');

// Embeds
$router->get('next/embed', 'EmbedController@index');

// Referrals CSV export
$router->get('next/referrals/export', 'ReferralController@csvExport');

/*
 * The following are API Routes that are currently using the web middleware,
 * until the implementation of JWT tokens.
 */

// Reactions
$router->post('next/reactions', 'ReactionController@store');
$router->delete('next/reactions/{id}', 'ReactionController@delete');

// Reportbacks
$router->resource('next/reportbacks', 'ReportbackController', ['except' => ['create', 'edit', 'destroy']]);
$router->resource('next/reportbackItems', 'ReportbackItemsController', ['only' => ['index']]);

$router->resource('next/referrals', 'ReferralController', ['only' => ['store']]);

// Signups
$router->resource('next/signups', 'SignupController', ['except' => ['create', 'edit', 'destroy']]);

// Activity
$router->get('next/activity/{campaignId}', 'ActivityController@show');
