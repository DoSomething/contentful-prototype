<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Feature Flags
    |--------------------------------------------------------------------------
    |
    | This file is a custom addition to Phoenix for storing feature flags, so
    | features can be conditionally toggled on and off per environment.
    |
    */

    'nps_survey' => env('DS_ENABLE_NPS_SURVEY', false),
    'voter_reg_modal' => env('DS_ENABLE_VOTER_REG_MODAL', false),
];
