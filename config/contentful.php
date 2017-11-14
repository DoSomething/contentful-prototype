<?php
/**
 * @copyright 2016 Contentful GmbH
 * @license   MIT
 */
$shouldUsePreview = config('app.env') === 'staging';
$tokenType = $shouldUsePreview ? 'PREVIEW' : 'DELIVERY';

return [
    /*
     * The ID of the space you want to access
     */
    'delivery.space' => env('CONTENTFUL_SPACE_ID'),

    /*
     * An API key for the above specified space
     */
    'delivery.token' => env('CONTENTFUL_CONTENT_'.$tokenType.'_API_KEY'),

    /*
     * Controls whether Contentful's Delivery or Preview API is accessed
     */
    'delivery.preview' => $shouldUsePreview,

    /*
     * Sets the locale in which to fetch content by default. NULL means the space'd default locale will be used
     */
    'delivery.defaultLocale' => 'en-US',
];
