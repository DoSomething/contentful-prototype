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
    // Campaigns
    $this->get('/campaigns', 'Api\CampaignsController@index');
    $this->get('/campaigns/{id}', 'Api\CampaignsController@show');

    // Campaign Posts
    $this->get('/campaigns/{id}/posts', 'Api\CampaignPostsController@index');
    $this->post('/campaigns/{id}/posts', 'Api\CampaignPostsController@store');

    // Campaign Signups
    $this->get('/campaigns/{id}/signups', 'Api\CampaignSignupsController@index');

    // Posts
    $this->get('/posts', 'Api\PostsController@index');

    // Shortlinks
    $this->post('links', 'Api\LinkController@store');
});
