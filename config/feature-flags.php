<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Feature Flags
    |--------------------------------------------------------------------------
    |
    | This file is a custom addition to Phoenix for storing feature flags, so
    | features can be conditionally toggled on and off & configured per environment.
    |
    | Please keep this list ordered alphabetically.
    |
    */

    'algolia_campaigns_search' => env('DS_ENABLE_ALGOLIA_CAMPAIGNS_SEARCH', false),
    'nps_survey' => env('DS_ENABLE_NPS_SURVEY', false),
    'post_confirmation_page' => env('DS_ENABLE_POST_CONFIRMATION_PAGE', false),
    'quiz_result_page' =>  env('DS_ENABLE_QUIZ_RESULT_PAGE', false),
    'refer_friends_incentive' => env('DS_ENABLE_REFER_FRIENDS_INCENTIVE', false),
    'sitewide_nps_survey' => env('DS_ENABLE_SITEWIDE_NPS_SURVEY', false),
    'rewards_levels' => env('DS_ENABLE_REWARDS_LEVELS', false),
];
