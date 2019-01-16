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

// Search
$router->get('us/search', 'SearchController');
$router->get('search', function () {
    $queryString = request()->has('query') ? '?query='.request('query') : '';

    return redirect('/us/search'.$queryString);
});

// Categorized Pages (articles, facts)
$categories = 'articles|facts|about';

$router->get('us/{category}/{slug}', 'CategorizedPageController@show')->where('category', $categories);
$router->get('{category}/{slug}', function ($category, $slug) {
    return redirect('us/'.$category.'/'.$slug);
})->where('category', $categories);

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

// Referrals
$router->resource('next/referrals', 'ReferralController', ['only' => ['store']]);
