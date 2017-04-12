<?php

use App\Entities\Campaign;
use Contentful\Delivery\Asset;
use Contentful\Delivery\DynamicEntry;
use Contentful\Delivery\ImageOptions;
use Illuminate\Support\HtmlString;

/**
 * App helper functions.
 */

/**
 * Create a script tag to set a global variable.
 *
 * @param $json
 * @param string $store
 * @return HtmlString
 */
function scriptify($json = [], $store = 'STATE')
{
    return new HtmlString('<script type="text/javascript">window.'.$store.' = '.json_encode($json).'</script>');
}

/**
 * Get an item from the cache, or store the default value.
 *
 * @param  string  $key
 * @param  \DateTime|float|int  $minutes
 * @param  \Closure  $callback
 * @return mixed
 */
function remember($key, $minutes, Closure $callback)
{
    return app('cache')->remember($key, $minutes, $callback);
}

/**
 * Make a cache key for API requests based on the request path and any query parameters,
 * so that the data can be stored in cache using a unique key. Query parameters are also
 * sorted alphabetically.
 *
 * @todo  Might be useful to sort csv of IDs in specific query params as well.
 *
 * @param  string $path
 * @param  array  $query
 * @return string
 */
function make_cache_key($path, $query = [])
{
    $output = str_replace('/', '-', $path);

    if ($query) {
        $query = array_sort_recursive($query);

        $items = [];

        foreach ($query as $key => $value) {
            $items[] = $key.'='.$value;
        }

        $output .= ':'.implode('&', $items);
    }

    return $output;
}

/**
 * Convert a file to a base64 encoded string in the following format:
 * data:[<media type>][;base64],<data>
 *
 * @param  [type] $pathname [description]
 * @param  string $mimeType
 * @return string
 */
function make_data_uri($pathname, $mimeType)
{
    return 'data:'.$mimeType.';base64,'.base64_encode(file_get_contents($pathname));
}

/**
 * Format a string of Markdown into HTML.
 *
 * @param $source
 * @return string
 */
function markdown($source)
{
    $parsedown = Parsedown::instance();
    $markup = $parsedown->setMarkupEscaped(true)->text($source);

    return new HtmlString($markup);
}

/**
 * Get image URL for a specified asset by the crop type.
 *
 * @param Asset $asset
 * @param  string $crop
 * @return string|null
 */
function get_image_url($asset, $crop = 'landscape')
{
    if (! $asset) {
        return null;
    }

    $options = [];

    $options['landscape'] = (new ImageOptions)
        ->setFormat('jpg')
        ->setWidth(1440)
        ->setHeight(620)
        ->setResizeFit('fill');

    $options['square'] = (new ImageOptions)
        ->setFormat('jpg')
        ->setWidth(600)
        ->setHeight(600)
        ->setResizeFit('fill');

    $options['logo'] = (new ImageOptions)
        ->setFormat('png')
        ->setHeight(50)
        ->setResizeFit('scale');

    if (! array_key_exists($crop, $options)) {
        throw new \InvalidArgumentException('The specified cover image type of '.$crop.' is not available.');
    }

    $locale = app()->getLocale();

    return $asset->getFile($locale)->getUrl($options[$crop]);
}

/**
 * Return either the field from the override object or the
 * base object.
 *
 * @param  string $field
 * @param  DynamicEntry $campaign
 * @param  DynamicEntry $override
 * @return mixed
 */
function useOverrideIfSet($field, $campaign, $override)
{
    $base = $campaign->{$field};
    if ($override === null) return $base;

    $override = $override->{$field};
    return $override === null ? $base : $override;
}

/**
 * Determine the fields to display in the social share.
 *
 * @param  Campaign $campaign
 * @param  DynamicEntry $shareOverrides
 * @return array
 */
function getShareFields($campaign, $shareOverrides)
{
    $coverImage = get_image_url(useOverrideIfSet('coverImage', $campaign, $shareOverrides), 'landscape');

    return [
        'title' => useOverrideIfSet('title', $campaign, $shareOverrides),
        'callToAction' => useOverrideIfSet('callToAction', $campaign, $shareOverrides),
        'coverImage' => 'http:' . $coverImage, // Contentful outputs "//" which Facebook cannot parse
        'facebookAppId' => config('services.analytics.facebook_id'),
        'quote' => $shareOverrides ? $shareOverrides->quote : null,
    ];
}

/**
 * Generate a link to Phoenix Ashes.
 *
 * @param  String $path path/to/something
 * @return String
 */
function phoenixLink($path)
{
    $base = config('services.phoenix-legacy.url');
    if (substr($base, -1) !== '/') {
        $base .= '/';
    }

    return $base . $path;
}
