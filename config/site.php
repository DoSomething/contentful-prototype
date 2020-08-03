<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Site Configuration
    |--------------------------------------------------------------------------
    |
    | This file is a custom addition to Phoenix for storing website configuration settings, so
    | things can be configured per environment.
    |
    | Please keep this list ordered alphabetically.
    |
    */

    'default_referral_campaign_id' => env('DS_DEFAULT_REFERRAL_CAMPAIGN_ID'),
    'hide_campaign_ids' => explode(',', env('DS_HIDE_CAMPAIGN_IDS')),
];
