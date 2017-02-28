<?php

use Illuminate\Http\Request;

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

Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {

    Route::get('/', function() {
        return 'Phoenix API version 1.0. Check the GitHub docs for available endpoints.';
    });

    Route::resource('reportbacks', 'ReportbackController', ['except' => ['create', 'edit', 'destroy']]);

    Route::resource('signups', 'SignupController', ['except' => ['create', 'edit', 'destroy']]);

    Route::post('reactions', 'ReactionController@update');

});
