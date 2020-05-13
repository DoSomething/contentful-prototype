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
    */

    'new_homepage' => env('DS_ENABLE_NEW_HOMEPAGE', false),
    'nps_survey' => env('DS_ENABLE_NPS_SURVEY', false),
    'dynamic_explore_campaigns' => env('DS_ENABLE_DYNAMIC_CAMPAIGNS_PAGE', false),
    'volunteer_credits' => env('DS_ENABLE_VOLUNTEER_CREDITS', false),
    'cause_preferences' => env('DS_ENABLE_CAUSE_INTERESTS_PAGE', false),
    'quiz_result_page' =>  env('DS_ENABLE_QUIZ_RESULT_PAGE', false),
    'sitewide_nps_survey' => env('DS_ENABLE_SITEWIDE_NPS_SURVEY', false),
    'snapchat_button' => env('DS_ENABLE_SNAPCHAT', false),
    'voter_reg_beta_page' => env('DS_ENABLE_VOTER_REG_BETA_PAGE', false),
];
