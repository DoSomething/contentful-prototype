<?php

use App\Entities\Campaign;
use Contentful\ImageOptions;
use Contentful\Delivery\Asset;
use App\Services\PhoenixLegacy;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Facades\Storage;
use SeatGeek\Sixpack\Session\Base as Sixpack;

/**
 * App helper functions.
 */

/**
 * Get one or a specified number of random values from an array.
 * @TODO: remove after upgrading Phoenix to Laravel 5.4.
 *
 * @param  array  $array
 * @param  int|null  $number
 * @return mixed
 *
 * @throws \InvalidArgumentException
 */
function array_random($array, $number = null)
{
    $requested = is_null($number) ? 1 : $number;
    $count = count($array);
    if ($requested > $count) {
        throw new InvalidArgumentException(
            "You requested {$requested} items, but there are only {$count} items available."
        );
    }
    if (is_null($number)) {
        return $array[array_rand($array)];
    }
    if ((int) $number === 0) {
        return [];
    }
    $keys = array_rand($array, $number);
    $results = [];
    foreach ((array) $keys as $key) {
        $results[] = $array[$key];
    }
    return $results;
}

/**
 * Determine if the supplied ID is likely a legacy campaign ID.
 *
 * @param  string $id
 * @return bool
 */
function is_legacy_id($id)
{
    return is_numeric($id);
}

/**
 * Create a script tag to set a global variable.
 *
 * @param  $json
 * @param  string $store
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
function remember($key, $minutes, Closure $callback, $skipCache = false)
{
    return $skipCache ? $callback() : app('cache')->remember($key, $minutes, $callback);
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
 * Get all Sixpack experiments from specified experiments definition file.
 *
 * @return array
 */
function get_experiments($file = 'experiments.json')
{
    $filePath = 'assets/'.$file;

    if (! Storage::disk('resources')->exists($filePath)) {
        return [];
    }

    $experiments = Storage::disk('resources')->get($filePath);

    return json_decode($experiments, true);
}

/**
 * Get selection of alternatives for all Sixpack experiments for the current client.
 *
 * @return array
 */
function get_experiment_alternatives_selection()
{
    if (! config('services.sixpack.enabled')) {
        return [];
    }

    $sixpack = app(Sixpack::class);

    $experiments = get_experiments();

    return collect($experiments)->map(function ($alternatives, $name) use ($sixpack) {
        return $data[$name] = $sixpack->participate($name, array_values($alternatives))->getAlternative();
    })->toArray();
}

/**
 * Get image URL for a specified asset by the crop type.
 *
 * @param Asset $asset
 * @param  string $style
 * @return string|null
 */
function get_image_url($asset, $style = null)
{
    if (! $asset) {
        return null;
    }

    /** @var \Contentful\ImageFile $file */
    $file = $asset->getFile();

    if (! $file instanceof \Contentful\ImageFile) {
        throw new \InvalidArgumentException('Cannot use file ' . $file->getFileName() . ' as an image.');
    }

    if (! $file) {
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

    // Provide cropped image if specified, or just the original image by default.
    $crop = isset($options[$style]) ? $options[$style] : null;

    // Force HTTPS. Contentful outputs protocol-relative "//".
    return 'https:' . $file->getUrl($crop);
}

/**
 * Return all or specific data from legacy campaign.
 *
 * @param  string $id
 * @param  string $key
 * @return mixed
 */
function get_legacy_campaign_data($id, $key = null)
{
    try {
        $campaign = (new PhoenixLegacy)->getCampaign($id);
    } catch (\Exception $error) {
        $handler = app(\App\Exceptions\Handler::class);
        $handler->report($error);

        return null;
    }

    if ($campaign && $key) {
        return data_get($campaign['data'], $key);
    }

    return $campaign;
}

/**
 * Return either the field from the override object or the
 * base object.
 *
 * @param  string $field
 * @param  mixed $base
 * @param  mixed $override
 * @return mixed
 */
function useOverrideIfSet($field, $base, $override)
{
    $baseField = data_get($base, $field);
    $overrideField = data_get($override, $field);

    // If there is an override value, return the override.
    // Otherwise, return the base value.
    return $overrideField !== null ? $overrideField : $baseField;
}

/**
 * Determine the fields to display in the social share.
 *
 * @param  stdClass $campaign
 * @param  string   $uri
 * @return array
 */
function get_social_fields($campaign, $uri)
{
    $socialOverride = $campaign->socialOverride ? $campaign->socialOverride->fields : null;
    $blockPath = $campaign->slug . '/blocks';
    $modalPath = $campaign->slug . '/modal';

    if (str_contains($uri, [$blockPath, $modalPath])) {
        $blockId = last(explode('/', $uri));

        $block = array_first($campaign->activityFeed, function ($value) use ($blockId) {
            return $value->id === $blockId;
        });

        if ($block && isset($block->fields->socialOverride)) {
            $socialOverride = $block->fields->socialOverride->fields;
        }
    }

    $coverImage = useOverrideIfSet('coverImage', $campaign, $socialOverride);
    // If the image is pulled from socialOverride, its going to be a string.
    // But if its pulled from campaign, its an object containing a url string.
    if (gettype($coverImage) === 'object') {
        $coverImage = $coverImage->landscapeUrl;
    }

    return [
        'title' => useOverrideIfSet('title', $campaign, $socialOverride),
        'callToAction' => useOverrideIfSet('callToAction', $campaign, $socialOverride),
        'coverImage' => $coverImage,
        'facebookAppId' => config('services.analytics.facebook_id'),
        'quote' => useOverrideIfSet('quote', $campaign, $socialOverride),
    ];
}

/**
 * Generate a link to Phoenix Ashes.
 *
 * @param  string $path path/to/something
 * @return string
 */
function phoenixLink($path)
{
    $base = config('services.phoenix-legacy.url');
    if (substr($base, -1) !== '/') {
        $base .= '/';
    }

    return $base . $path;
}

/**
 * Get the env vars which are safe for client usage.
 *
 * @return array
 */
function get_client_environment_vars()
{
    return [
        'APP_ENV' => config('app.env'),
        'GLADIATOR_URL' => config('services.gladiator.url'),
        'NORTHSTAR_URL' => config('services.northstar.url'),
        'PHOENIX_URL' => config('services.phoenix.url'),
        'PHOENIX_LEGACY_URL' => config('services.phoenix-legacy.url'),
        'PUCK_URL' => config('services.analytics.puck_url'),
        'SIXPACK_BASE_URL' => config('services.sixpack.url'),
        'SIXPACK_COOKIE_PREFIX' => config('services.sixpack.prefix'),
        'SIXPACK_ENABLED' => config('services.sixpack.enabled'),
        'SIXPACK_TIMEOUT' => config('services.sixpack.timeout'),
        'SURVEY_ENABLED' => config('services.survey.enabled'),
    ];
}

/**
 * Get the presentation values we should package with our
 * Northstar authorization requests.
 *
 * @param  stdClass $campaign
 * @return array
 */
function get_login_query($campaign = null)
{
    if (! $campaign) {
        return [];
    }

    return [
        'destination' => $campaign->title,
        'options' => [
            'title' => $campaign->title,
            'coverImage' => $campaign->coverImage->url,
            'callToAction' => $campaign->callToAction,
        ],
    ];
}
