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

// v1 Routes
$router->group(['prefix' => 'v1'], function () {
    // Posts
    $this->get('/posts', 'Api\PostsController@index');

    // Campaigns
    $this->get('/campaigns', 'Api\CampaignsController@index');
    $this->get('/campaigns/{id}', 'Api\CampaignsController@show');

    // Campaign Posts
    $this->get('/campaigns/{id}/posts', 'Api\CampaignPostsController@index');
    $this->post('/campaigns/{id}/posts', 'Api\CampaignPostsController@store');
});
