<?php

use Illuminate\Support\Facades\Route;

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
Route::group(['prefix' => 'v2'], function () {
    // Status health check
    Route::get('/status', function () {
        return ['status' => 'good'];
    });

    // Blocks
    Route::get('/blocks/{id}', 'Api\BlocksController@show');

    // Campaigns
    Route::get('/campaigns', 'Api\CampaignsController@index');
    Route::get('/campaigns/{id}', 'Api\CampaignsController@show');

    // Campaign Posts
    Route::get('/campaigns/{id}/posts', 'Api\CampaignPostsController@index');
    Route::post('/campaigns/{id}/posts', 'Api\CampaignPostsController@store');

    // Campaign Signups
    Route::get('/campaigns/{id}/signups', 'Api\CampaignSignupsController@index');
    Route::post('/campaigns/{id}/signups', 'Api\CampaignSignupsController@store');

    // Shortlinks
    Route::post('/links', 'Api\LinkController@store');

    // Posts
    Route::get('/posts', 'Api\PostsController@index');
    Route::post('/posts', 'Api\PostsController@store');

    // Zendesk Tickets
    Route::post('/zendesk-tickets', 'Api\ZendeskTicketsController@store');

    // Unknown Route Fallback
    Route::fallback(function () {
        return response()->json(['message' => 'Not Found!'], 404);
    });
});
