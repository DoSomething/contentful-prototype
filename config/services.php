<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'analytics' => [
        'customer_io_id' => env('CUSTOMER_IO_ID'),
        'facebook_id' => env('FACEBOOK_APP_ID'),
        'google_tag_manager_id' => env('GOOGLE_TAG_MANAGER_ID'),
        'snowplow_url' => env('SNOWPLOW_URL'),
    ],

    'graphql' => [
        'url' => env('GRAPHQL_URL', 'https://graphql-qa.dosomething.org/graphql'),
    ],

    'rogue' => [
        'url' => env('ROGUE_URL', 'https://rogue-qa.dosomething.org'),
    ],

    'northstar' => [
        'grant' => 'authorization_code', // Default OAuth grant to use: either 'authorization_code' or 'client_credentials'
        'url' => env('NORTHSTAR_URL'),
        'key' => storage_path('keys/public.key'),
        'bridge' => \DoSomething\Gateway\Laravel\LaravelOAuthBridge::class,

        'authorization_code' => [
            'client_id' => env('NORTHSTAR_AUTHORIZATION_ID'),
            'client_secret' => env('NORTHSTAR_AUTHORIZATION_SECRET'),
            'scope' => ['user', 'activity', 'write', 'openid', 'role:staff', 'role:admin'],
            'redirect_uri' => 'authorize',
        ],
    ],

    'sixpack' => [
        'enabled' => env('SIXPACK_ENABLED'),
        'url' => env('SIXPACK_BASE_URL'),
        'prefix' => env('SIXPACK_COOKIE_PREFIX'),
        'timeout' => env('SIXPACK_TIMEOUT'),
    ],

    'bertly' => [
        'url' => env('BERTLY_URL', 'https://dosome.click'),
    ],

    'contentful' => [
        'url' => 'https://app.contentful.com',
        'cache' => env('CONTENTFUL_CACHE', true),
    ],
];
