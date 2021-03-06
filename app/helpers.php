<?php

use App\Entities\Campaign;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\HtmlString;
use Contentful\Core\File\ImageOptions;
use Contentful\Delivery\Resource\Asset;

/**
 * Get a composed cache ID from a prefix and url slug.
 *
 * @param  string $prefix
 * @param  string $slug
 * @return string
 */
function get_cache_id($prefix, $slug)
{
    return $prefix.'_'.str_replace('/', '_', $slug);
}

/**
 * Get a composed cache URL with a redirect URL to go to
 * after clearing the cached item.
 *
 * @param  string      $prefix
 * @param  string|null $slug
 * @return string
 */
function get_cache_url($prefix, $slug = null)
{
    $cacheId = $slug ? get_cache_id($prefix, $slug) : $prefix;

    $redirectUrl = str_replace(request()->root(), '', request()->fullUrl());

    // Return full cache url, with redirect url encoded to ensure all query parameters are included.
    return '/cache/'.$cacheId.'?redirect='.urlencode($redirectUrl);
}

/**
 * Get a composed Contentful URL to the current active environment.
 *
 * @return string
 */
function get_contentful_url()
{
    $spaceId = config('contentful.delivery.space');
    $environment = config('contentful.delivery.environment');

    $environmentPath = $environment !== 'master' ? 'environments/'.$environment.'/' : '';

    return config('services.contentful.url').'/spaces/'.$spaceId.'/'.$environmentPath;
}

/**
 * Get page setting variables for the Admin Dashboard.
 *
 * @param  object $page
 * @param  string $prefix
 * @param  string $slug
 * @return array
 */
function get_page_settings($page, $prefix, $slug = null)
{
    return [
        'cacheUrl' => config('services.contentful.cache') ? get_cache_url($prefix, $slug) : null,
        'editUrl' => get_contentful_url().'entries/'.$page->id,
        'type' => readable_title($page->type),
    ];
}

/**
 * Get page setting variables for the Admin Dashboard for 404 pages.
 *
 * @param  string $prefix
 * @param  string $slug
 * @return array
 */
function get_not_found_page_settings($prefix, $slug)
{
    return [
        'cacheUrl' => get_cache_url($prefix, $slug),
        'searchUrl'=> get_contentful_url().'entries?searchText='.$slug,
        'type' => 'Page Not Found',
    ];
}

/**
 * Get the appropriate page content type by page category.
 *
 * @param  string $category
 * @return string
 */
function get_content_type_by_category($category)
{
    $types = [
        'articles' => 'page',
        'facts' => 'page',
        'stories' => 'storyPage',
        'campaigns' => 'campaign',
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
 * Determin if the user is authenticated and that they have Staff authorization.
 *
 * @return bool
 */
function has_staff_access()
{
    return auth()->user() && auth()->user()->isStaff();
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
 * Determine if URL is of the same origin as the app's URL.
 *
 * @param  string $url
 * @return bool
 */
function is_same_domain($url)
{
    $urlHost = data_get(parse_url($url), 'host');
    $appUrlHost = data_get(parse_url(config('app.url')), 'host');

    if (! $urlHost || ! $appUrlHost) {
        return false;
    }

    return $urlHost === $appUrlHost;
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
    return new HtmlString('<script type="text/javascript">window.'.$store.' = window.'.$store.' || '.json_encode($json).'</script>');
}

/**
 * Convert a string into a readable title cased string.
 *
 * @param  string $string
 * @return string
 */
function readable_title($string)
{
    return Str::title(str_replace('_', ' ', Str::snake($string)));
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
    return cache()->remember($key, now()->addMinutes($minutes), $callback);
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
 * @deprecated
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

    if (! $file) {
        return null;
    }

    if (! $file instanceof \Contentful\Core\File\ImageFile) {
        throw new \InvalidArgumentException('Cannot use file ' . $file->getFileName() . ' as an image.');
    }

    if (! $file) {
        return null;
    }

    $options = [];

    $options['landscape'] = (new ImageOptions)
        ->setFormat('jpg')
        ->setWidth(2880)
        ->setHeight(1240)
        ->setResizeFit('fill');

    $options['square'] = (new ImageOptions)
        ->setFormat('jpg')
        ->setWidth(1200)
        ->setHeight(1200)
        ->setResizeFit('fill');

    $options['logo'] = (new ImageOptions)
        ->setFormat('png')
        ->setHeight(100)
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

    $description = data_get($entry, 'metadata.fields.description', null) ?: data_get($entry, 'callToAction', null);

    return [
        'title' => data_get($entry, 'metadata.fields.title', $entry->title),
        'type' => 'article',
        'description' => Str::limit($description, 160),
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
 * A hacky function that allows us to fall back to hard-coded metadata for special
 * pages that don't support editor-specified metadata (e.g. campaign collections).
 *
 * @return array
 */
function metadata_fallback()
{
    $HARDCODED_METADATA = [
        'us/collections/corona-virus-campaigns' => [
            'type' => 'article',
            'url' => request()->url(),
            'title' => 'Don\'t let COVID-19 stop you from changing the world.',
            'description' => 'Join millions of DoSomething members using our resources to stay healthy, fight anxiety, and make a difference on the causes we care about, from mental health to climate change and beyond. Let’s Do This.',
            'image' => [
                'url' => 'https://images.ctfassets.net/81iqaqpfd8fy/6Ko2KXJ0fCKmZIm2G6ATEs/2ef1f7694fb81a824940aa697d27cb9f/COVID_metadata.jpg?f=center&fit=fill&h=1200&w=1200',
                'width' => '1200',
                'height' => '1200',
            ],
            'facebook_app_id' => config('services.analytics.facebook_id'),
        ],
    ];

    return Arr::get($HARDCODED_METADATA, request()->path());
}

/**
 * Get the presentation values we should package with our
 * Northstar authorization requests.
 *
 * @param  stdClass $campaign
 * @return array
 */
function get_authorization_query($entity = null, $mode = null)
{
    $query = [];
    $options = [];
    $params = [
        'referrer_user_id',
        'utm_campaign',
        'utm_medium',
        'utm_source',
        'utm_content',
    ];

    if ($mode) {
        $query['mode'] = $mode;
    }

    foreach ($params as $param) {
        if (request($param)) {
            $options[$param] = request($param);
        }
    }

    if (! $entity) {
        $query['options'] = $options;

        return $query;
    }

    $query['destination'] = $entity->title;

    $query['options'] = array_merge($options, [
        'contentful_id' => $entity->id,
        'title' => $entity->title,
        'coverImage' => $entity->coverImage->url,
        'callToAction' => $entity->callToAction,
    ]);

    return $query;
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

/**
 * Determine if we should track a Customer.io page view.
 *
 * @return bool
 */
function should_track_customer_io_page_view()
{
    // Ensure we have a Customer.io space ID.
    if (! config('services.analytics.customer_io_id')) {
        return false;
    }

    // If the user is authenticated, we'll want to track their page view.
    if (auth()->check()) {
        return true;
    }

    // Otherwise, we'll only track the page view if we determine that they're visting a link recieved via a DoSomething SMS.
    return request()->query('user_id') && request()->query('utm_medium') === 'sms';
}

/**
 * Get the user ID to identify the user for a customer.io pageview event.
 *
 * @return string
 */
function get_user_id_for_customer_io()
{
    // We'll either grab the authenticated user's ID,
    // or rely on the user_id query parameter for SMS links.
    return auth()->id() ?: request()->query('user_id');
}
