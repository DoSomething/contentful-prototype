<?php

/**
 * Set web routes for the application.
 *
 * @var \Illuminate\Routing\Router $router
 * @see \App\Providers\RouteServiceProvider
 */

// Homepage
$router->redirect('/', 'us/campaigns/sincerely-us');
$router->redirect('/us', 'us/campaigns/sincerely-us');

// Authentication
$router->get('next/login', 'AuthController@getLogin')->name('login');
$router->get('next/logout', 'AuthController@getLogout')->name('logout');

// Campaigns
$router->get('us/campaigns', 'CampaignController@index');
$router->redirect('campaigns', 'us/campaigns');

$router->get('us/campaigns/{slug}/{clientRoute?}', 'CampaignController@show')
    ->where('clientRoute', '.*');
$router->redirect('campaigns/{slug}', 'us/campaigns/{slug}');

// Campaigns cache clear
$router->get('next/cache/{cacheId}', 'CacheController');

// Embeds
$router->get('next/embed', 'EmbedController@index');

// Referrals CSV export
$router->get('referrals/export', 'ReferralController@csvExport');

/*
 * The following are API Routes that are currently using the web middleware,
 * until the implementation of JWT tokens.
 */

// Competitions
$router->post('next/contests/users', 'UserContestController@store');
$router->get('next/contests/users', 'UserContestController@index');

// Reactions
$router->post('next/reactions', 'ReactionController@store');
$router->delete('next/reactions/{id}', 'ReactionController@delete');

// Reportbacks
$router->resource('next/reportbacks', 'ReportbackController', ['except' => ['create', 'edit', 'destroy']]);
$router->resource('next/reportbackItems', 'ReportbackItemsController', ['only' => ['index']]);

$router->resource('next/referrals', 'ReferralController', ['only' => ['store']]);

// Signups
$router->get('next/signups/total/{campaignId}', 'SignupController@total');
$router->resource('next/signups', 'SignupController', ['except' => ['create', 'edit', 'destroy']]);

// Activity
$router->get('next/activity/{campaignId}', 'ActivityController@show');
