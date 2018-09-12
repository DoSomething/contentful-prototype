<?php
/**
 * @copyright 2016 Contentful GmbH
 * @license   MIT
 */

return [
    /*
     * The ID of the space you want to access
     */
    'delivery.space' => env('CONTENTFUL_SPACE_ID'),

    /*
     * An API key for the above specified space
     */
    'delivery.token' => env('CONTENTFUL_CONTENT_API_KEY'),

    /*
     * Controls which Contentful Environment is accessed (defaults to 'master')
     */
    'delivery.environment' => env('CONTENTFUL_ENVIRONMENT_ID', 'master'),

    /*
     * Controls whether Contentful's Delivery or Preview API is accessed
     */
    'delivery.preview' => env('CONTENTFUL_USE_PREVIEW_API', false),

    /*
     * Sets the locale in which to fetch content by default. NULL means the space'd default locale will be used
     */
    'delivery.defaultLocale' => 'en-US',
];
