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

    'cause_preferences' => env('DS_ENABLE_CAUSE_INTERESTS_PAGE', false),
    'dynamic_explore_campaigns' => env('DS_ENABLE_DYNAMIC_CAMPAIGNS_PAGE', false),
    'hide_campaigns' => env('DS_ENABLE_HIDE_CAMPAIGNS', false),
    'new_homepage' => env('DS_ENABLE_NEW_HOMEPAGE', false),
    'nps_survey' => env('DS_ENABLE_NPS_SURVEY', false),
    'quiz_result_page' =>  env('DS_ENABLE_QUIZ_RESULT_PAGE', false),
    'refer_friends_incentive' => env('DS_ENABLE_REFER_FRIENDS_INCENTIVE', false),
    'sitewide_nps_survey' => env('DS_ENABLE_SITEWIDE_NPS_SURVEY', false),
    'volunteer_credits' => env('DS_ENABLE_VOLUNTEER_CREDITS', false),
];
