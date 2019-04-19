<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// v2 Routes
$router->group(['prefix' => 'v2'], function () {
    // Status health check
    $this->get('/status', function () {
        return ['status' => 'good'];
    });

    // Blocks
    $this->get('/blocks/{id}', 'Api\BlocksController@show');

    // Campaigns
    $this->get('/campaigns', 'Api\CampaignsController@index');
    $this->get('/campaigns/{id}', 'Api\CampaignsController@show');

    // Campaign Posts
    $this->get('/campaigns/{id}/posts', 'Api\CampaignPostsController@index');
    $this->post('/campaigns/{id}/posts', 'Api\CampaignPostsController@store');

    // Campaign Signups
    $this->get('/campaigns/{id}/signups', 'Api\CampaignSignupsController@index');
    $this->post('/campaigns/{id}/signups', 'Api\CampaignSignupsController@store');

    // Shortlinks
    $this->post('/links', 'Api\LinkController@store');

    // Posts
    $this->get('/posts', 'Api\PostsController@index');
    $this->post('/posts', 'Api\PostsController@store');

    // Signups
    $this->get('/signups', 'Api\SignupsController@index');

    // Unknown Route Fallback
    $this->fallback(function () {
        return response()->json(['message' => 'Not Found!'], 404);
    });
});
