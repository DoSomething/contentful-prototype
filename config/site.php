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

    // These Group Type IDs have a 'chapter' group label instead of the default in Group Finders.
    'chapter_group_type_ids' => explode(',', env('DS_CHAPTER_GROUP_TYPE_IDS')),
    'default_referral_campaign_id' => env('DS_DEFAULT_REFERRAL_CAMPAIGN_ID'),
    'go_greener_campaign_goal' => env('DS_GO_GREENER_GOAL'),
    'go_greener_campaign_quantity' => env('DS_GO_GREENER_QUANTITY'),
    'hide_campaign_ids' => explode(',', env('DS_HIDE_CAMPAIGN_IDS')),
];
