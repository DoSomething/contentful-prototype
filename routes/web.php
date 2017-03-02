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
$router->get('campaigns/{slug}', 'CampaignController@show');

// Waiting List: for collecting user emails pre-launch.
$router->post('waitinglist', 'WaitingListController@store');

// Reactions
$router->post('reactions', 'ReactionController@store');
$router->delete('reactions/{id}', 'ReactionController@delete');

// Embeds
$router->get('embed', 'EmbedController@index');
