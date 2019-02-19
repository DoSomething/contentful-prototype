<?php

use App\Entities\Campaign;
use Illuminate\Support\HtmlString;
use Contentful\Core\File\ImageOptions;
use Contentful\Delivery\Resource\Asset;

/**
 * Get the appropriate page content type by page category.
 *
 * @param  string $category
 * @return string
 */
function get_content_type_by_category($category)
{
    $types = [
        'about' => 'page',
        'articles' => 'page',
        'facts' => 'page',
        'stories' => 'storyPage',
    ];

    return data_get($types, $category, 'page');
}

/**
 * Get Heroku database configuration variables from supplied
 * database url.
 *
 * @param  string $url
 * @param  string $key
 * @param  string $default
 * @return string
 */
function get_heroku_url_vars($url, $key, $default = '')
{
    if (! env($url)) {
        return $default;
    }

    $vars = parse_url(env($url));

    $value = data_get($vars, $key, $default);

    if ($key === 'path') {
        return substr($value, 1) ?: $default;
    } else {
        return $value;
    }
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
function remember($key, $minutes, Closure $callback)
{
    return cache()->remember($key, $minutes, $callback);
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
 * @param  string $style
 * @return string|null
 */
function get_image_url($asset, $style = null)
{
    if (! $asset) {
        return null;
    }

    /** @var \Contentful\Core\File\ImageFile $file */
    $file = $asset->getFile();

    if (! $file instanceof \Contentful\Core\File\ImageFile) {
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
 * @param  \Contentful\Delivery\Resource\Entry|stdClass $entry
 * @return array|null
 * @deprecated Will be removed; use get_metadata() instead.
 */
function get_social_fields($entry)
{
    // @TODO We'll want to re-assess the following once we re-work caching Contentful queries.

    // If this is an Entry which has been cast as JSON and thus completely JSON serialized.
    if (get_class($entry) === 'stdClass') {
        $socialOverride = object_get($entry->fields, 'socialOverride.fields');
    // Otherwise, It should be a non-cast Contentful Entity object.
    } else {
        $socialOverride = $entry->socialOverride;
    }

    if (! $socialOverride) {
        return;
    }

    // If the socialOverride is pulled from an Entity object, the cover image field
    // will be an Asset object from which we'll need to pull a URL string.
    if (gettype($socialOverride->coverImage) === 'object') {
        $socialOverride->coverImage = get_image_url($socialOverride->coverImage, 'landscape');
    }

    return [
        'title' => $socialOverride->title,
        'callToAction' => $socialOverride->callToAction,
        'coverImage' => $socialOverride->coverImage,
        'facebookAppId' => config('services.analytics.facebook_id'),
        'quote' => $socialOverride->quote,
    ];
}

/**
 * Get metadata associated with a page or campaign.
 *
 * @param  \Contentful\Delivery\Resource\Entry|stdClass $entry
 * @return array
 */
function get_metadata($entry)
{
    $entryType = data_get($entry, 'type');

    // Unify $entry object properties structure between campaigns and pages.
    if ($entryType !== 'campaign') {
        $entry = $entry->fields;
    }

    $baseUrl = config('app.url').'/us';

    $image = data_get($entry, 'metadata.fields.image', null);

    if (! $image && data_get($entry, 'coverImage')) {
        $image = $entry->coverImage->url;
    }

    return [
        'title' => data_get($entry, 'metadata.fields.title', $entry->title),
        'type' => 'article',
        'description' => data_get($entry, 'metadata.fields.description', null),
        'url' => $entryType === 'campaign' ? $baseUrl.'/campaigns/'.$entry->slug : $baseUrl.'/'.$entry->slug,
        'facebook_app_id' => config('services.analytics.facebook_id'),
        'image' => [
            // Recommended social share image size is 1200x1200.
            'url' => $image ? $image.'?w=1200&h=1200&fm=jpg&fit=fill' : 'https://forge.dosomething.org/resources/ds-logo-landscape.png',
            'width' => '1200',
            // Images will have height of 1200px, unless defaulting to DS Landscape Logo which is 630px.
            'height' => $image ? '1200' : '630',
        ],
    ];
}

/**
 * Determine the fields to display in the social share for a campaign.
 *
 * @param  stdClass $campaign
 * @param  string   $uri
 * @return array
 */
function get_campaign_social_fields($campaign, $uri)
{
    $socialOverride = $campaign->socialOverride ? $campaign->socialOverride->fields : null;
    $blockPath = $campaign->slug . '/blocks';
    $modalPath = $campaign->slug . '/modal';

    if (str_contains($uri, [$blockPath, $modalPath])) {
        $block = null;
        $blockId = last(explode('/', $uri));

        // Find the community page.
        $communityPage = array_first($campaign->pages, function ($value) {
            return isset($value->fields->slug) && ends_with($value->fields->slug, 'community');
        });

        if ($communityPage) {
            // Find the block within the community page block if available.
            $block = array_first($communityPage->fields->blocks, function ($value) use ($blockId) {
                return $value->id === $blockId;
            });
        }

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

/**
 * Get a CSV from defined columns and records.
 *
 * @param  array $columns
 * @param  array $records
 * @return string
 */
function generate_streamed_csv($columns, $records)
{
    $file = fopen('php://output', 'w');

    fputcsv($file, $columns);

    foreach ($records as $record) {
        $row = [];

        foreach ($columns as $column) {
            array_push($row, $record->{$column});
        }

        fputcsv($file, $row);
    }

    return fclose($file);
}
