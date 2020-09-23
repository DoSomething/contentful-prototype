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
    /**
     * The CivicEngine vars are used forVoting Widget configuration.
     * @see https://developers.civicengine.com/docs/widget
     */
    'civic_engine_client_name' => env('CIVIC_ENGINE_CLIENT_NAME'),
    'civic_engine_embed_type' => env('CIVIC_ENGINE_EMBED_TYPE'),
    'civic_engine_utm_source' => env('CIVIC_ENGINE_UTM_SOURCE'),
    'default_referral_campaign_id' => env('DS_DEFAULT_REFERRAL_CAMPAIGN_ID'),
    'hide_campaign_ids' => explode(',', env('DS_HIDE_CAMPAIGN_IDS')),
    // This will be deprecated per civic_engine config vars, expects the embed.js URL.
    'voting_widget_src_url' =>  env('DS_VOTING_WIDGET_SRC_URL'),
];
