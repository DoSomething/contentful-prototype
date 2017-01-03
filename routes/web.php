<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/**
 * Campaigns
 */
Route::get('campaigns', 'CampaignController@index');
Route::get('campaigns/{slug}', 'CampaignController@show');

/**
 * Testing
 *
 * Temporary route for testing requests to contentful.
 */
Route::get('contentful', function () {
    $client = app('contentful.delivery');

    return $client->getContentType('campaign');
});


Route::get('sixpack', function() {
    $sixpack = new SeatGeek\Sixpack\Session\Base;

    $alternate =  $sixpack->participate('test', ['blue', 'red'])->getAlternative();

    if ($alternate === 'blue') {
        return view('sixpack.blue_show');
    } else {
        return view('sixpack.red_show');
    }
});


Route::get('/blue', function() {
    $sixpack = new SeatGeek\Sixpack\Session\Base;

    $sixpack->convert('test');

    return 'Blue wins!';
});

Route::get('/red', function() {
    $sixpack = new SeatGeek\Sixpack\Session\Base;

    $sixpack->convert('test');

    return 'Red wins!';
});

