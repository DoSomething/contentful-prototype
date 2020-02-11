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
    'referral_campaign_ids' => explode(',', env('DS_REFERRAL_CAMPAIGN_IDS')),
    'default_referral_campaign_id' => env('DS_DEFAULT_REFERRAL_CAMPAIGN_ID'),
    'dynamic_explore_campaigns' => env('DS_ENABLE_DYNAMIC_CAMPAIGNS_PAGE', false),
];
