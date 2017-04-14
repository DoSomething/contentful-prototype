<?php

/**
 * Set web routes for the application.
 *
 * @var \Illuminate\Routing\Router $router
 * @see \App\Providers\RouteServiceProvider
 */

// Homepage
$router->get('/', function () {
    return view('welcome');
});

// Authentication
$router->get('next/login', 'AuthController@getLogin')->name('login');
$router->get('next/logout', 'AuthController@getLogout')->name('logout');

// Campaigns
$router->get('campaigns', 'CampaignController@index');
$router->get('us/campaigns/{slug}/{clientRoute?}', 'CampaignController@show')
    ->where('clientRoute', '.*');
$router->get('campaigns/{path}', 'CampaignController@redirect')
    ->where('path', '.*');

// Waiting List: for collecting user emails pre-launch.
$router->post('waitinglist', 'WaitingListController@store');

// Embeds
$router->get('next/embed', 'EmbedController@index');


/**
 * The following are API Routes that are currently using the web middleware,
 * until the implementation of JWT tokens.
 */

// Reactions
$router->post('next/reactions', 'ReactionController@store');
$router->delete('next/reactions/{id}', 'ReactionController@delete');

// Reportbacks
$router->resource('next/reportbacks', 'ReportbackController', ['except' => ['create', 'edit', 'destroy']]);
$router->resource('next/reportbackItems', 'ReportbackItemsController', ['only' => ['index']]);

// Signups
$router->get('next/signups/total/{campaignId}', 'SignupController@total');
$router->resource('next/signups', 'SignupController', ['except' => ['create', 'edit', 'destroy']]);

// Activity
$router->get('next/activity/{campaignId}', 'ActivityController@show');
