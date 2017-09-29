<?php

use App\Entities\Campaign;
use Contentful\ImageOptions;
use Contentful\Delivery\Asset;
use App\Services\PhoenixLegacy;
use Illuminate\Support\HtmlString;
use Contentful\Delivery\DynamicEntry;
use Illuminate\Support\Facades\Storage;
use SeatGeek\Sixpack\Session\Base as Sixpack;

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
 * @param  Campaign $campaign
 * @param  DynamicEntry $override
 * @return mixed
 */
function useOverrideIfSet($field, $campaign, $override)
{
    $base = $campaign->{$field};
    if ($override === null) {
        return $base;
    }

    if (isset($override->{$field})) {
        return $override->{$field};
    }

    return $base;
}

/**
 * Determine the fields to display in the social share.
 *
 * @param  Campaign $campaign
 * @param  String   $uri
 * @return array
 */
function get_social_fields($campaign, $uri)
{
    $campaignFlattened = json_decode(json_encode($campaign));
    $socialOverride = $campaignFlattened->socialOverride->fields;
    $blockPath = $campaignFlattened->slug . '/blocks';

    if (str_contains($uri, $blockPath)) {
        $blockId = last(explode('/', $uri));

        $block = array_first($campaignFlattened->activityFeed, function ($value) use ($blockId) {
            return $value->id === $blockId;
        });

        if ($block && isset($block->fields->socialOverride)) {
            $socialOverride = $block->fields->socialOverride->fields;
        }
    }

    $coverImage = useOverrideIfSet('coverImage', $campaignFlattened, $socialOverride);
    if (gettype($coverImage) === 'object') {
        $coverImage = $coverImage->url;
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
        'SIXPACK_ENABLED' => config('services.sixpack.enabled'),
        'SIXPACK_BASE_URL' => config('services.sixpack.url'),
        'SIXPACK_COOKIE_PREFIX' => config('services.sixpack.prefix'),
        'SIXPACK_TIMEOUT' => config('services.sixpack.timeout'),
        'PUCK_URL' => config('services.analytics.puck_url'),
    ];
}

/**
 * Get the presentation values we should package with our
 * Northstar authorization requests.
 *
 * @param  Campaign $campaign
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
            'coverImage' => get_image_url($campaign->coverImage),
            'callToAction' => $campaign->callToAction,
        ],
    ];
}
