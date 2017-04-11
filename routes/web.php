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
$router->get('login', 'AuthController@getLogin');
$router->get('logout', 'AuthController@getLogout');

// Campaigns
$router->get('campaigns', 'CampaignController@index');
$router->get('campaigns/{slug}/{clientRoute?}', 'CampaignController@show')
    ->where('clientRoute', '.*');

// Waiting List: for collecting user emails pre-launch.
$router->post('waitinglist', 'WaitingListController@store');

// Embeds
$router->get('embed', 'EmbedController@index');


/**
 * The following are API Routes that are currently using the web middleware,
 * until the implementation of JWT tokens.
 */

// Reactions
$router->post('reactions', 'ReactionController@store');
$router->delete('reactions/{id}', 'ReactionController@delete');

// Reportbacks
$router->resource('reportbacks', 'ReportbackController', ['except' => ['create', 'edit', 'destroy']]);

// Signups
$router->get('signups/total/{campaignId}', 'SignupController@total');
$router->resource('signups', 'SignupController', ['except' => ['create', 'edit', 'destroy']]);

// Activity
$router->get('activity/{campaignId}', 'ActivityController@show');
