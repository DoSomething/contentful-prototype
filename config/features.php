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
    'voter_reg_modal' => env('DS_ENABLE_VOTER_REG_MODAL', false),
    'dynamic_explore_campaigns' => env('DS_ENABLE_DYNAMIC_CAMPAIGNS_PAGE', false),
    'volunteer_credits' => env('DS_ENABLE_VOLUNTEER_CREDITS', false),
    'cause_preferences' => env('DS_ENABLE_CAUSE_INTERESTS_PAGE', false),
];
