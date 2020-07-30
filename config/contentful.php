<?php

/**
 * This file is part of the contentful/laravel package.
 *
 * @copyright 2015-2020 Contentful GmbH
 * @license   MIT
 */

return [
    'delivery' => [
        /*
        * The ID of the space you want to access
        */
        'space' => env('CONTENTFUL_SPACE_ID'),

        /*
        * An API key for the above specified space
        */
        'token' => env('CONTENTFUL_CONTENT_API_KEY'),

        /*
        * Controls which Contentful Environment is accessed (defaults to 'master')
        */
        'environment' => env('CONTENTFUL_ENVIRONMENT_ID', 'master'),

        /*
        * Controls whether Contentful's Delivery or Preview API is accessed
        */
        'preview' => (bool) env('CONTENTFUL_USE_PREVIEW_API', false),

        /*
        * Sets the locale in which to fetch content by default. NULL means the space'd default locale will be used
        */
        'defaultLocale' => 'en-US',
    ],
];
