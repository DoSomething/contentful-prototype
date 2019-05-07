<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'analytics' => [
        'customer_io_id' => env('CUSTOMER_IO_ID'),
        'facebook_id' => env('FACEBOOK_APP_ID'),
        'google_id' => env('GOOGLE_ANALYTICS_ID'),
        'google_tag_manager_id' => env('GOOGLE_TAG_MANAGER_ID'),
        'puck_url' => env('PUCK_URL'),
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
            'redirect_uri' => 'next/login',
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
        'key' => env('BERTLY_API_KEY'),
    ],

    'contentful' => [
        'url' => 'https://app.contentful.com',
        'cache' => env('CONTENTFUL_CACHE', true),
    ],

    'timed_modals' => [
        'nps_survey' => [
            'enabled' => env('NPS_SURVEY_ENABLED', false),
        ],
        'voter_reg_modal' => [
            'enabled' => env('VOTER_REG_MODAL_ENABLED', false),
        ],
    ],
];
