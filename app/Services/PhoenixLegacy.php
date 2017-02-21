<?php

namespace App\Services;

use DoSomething\Gateway\Common\RestApiClient;
use Illuminate\Http\Request;

class PhoenixLegacy extends RestApiClient
{
    use AuthorizesWithDrupal;

    /**
     * Mintues to retain data in cache.
     *
     * @var \DateTime|float|int
     */
    private $cacheExpiration = 30;

    /**
     * PhoenixLegacy constructor.
     */
    public function __construct()
    {
        $base_url = config('services.phoenix-legacy.url');

        parent::__construct($base_url . '/api/');
    }

    /**
     * Get an index of (optionally filtered) campaign signups from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-signup-collection
     *
     * @param array $query - query string, for filtering results
     * @return array - JSON response
     */
    public function getAllSignups(array $query = [])
    {
        $path = 'v1/signups';

        return remember(make_cache_key('legacy-'.$path, $query), $this->cacheExpiration, function() use ($path, $query) {
            return $this->get($path, $query);
        });
    }

    /**
     * Get details for a particular campaign signup from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-specific-signup
     *
     * @return array - JSON response
     */
    public function getSignup($signup_id)
    {
        $path = 'v1/signups/'.$signup_id;

        return remember(make_cache_key('legacy-'.$path), $this->cacheExpiration, function () use ($path) {
            return $this->get($path);
        });
    }

    /**
     * Store a new campaign signup on the Drupal site.
     * @see: https://github.com/DoSomething/dosomething/wiki/API#campaign-signup
     *
     * @param string $user_id - UID of user on the Drupal site
     * @param string $campaign_id - NID of campaign on the Drupal site
     * @param string $source - Sign up source (e.g. web, iPhone, etc.)
     *
     * @return string - Signup ID
     */
    public function storeSignup($user_id, $campaign_id, $source)
    {
        return $this->post('v1/campaigns/'.$campaign_id.'/signup', [
            'uid' => $user_id,
            'source' => $source,
        ]);
    }

    /**
     * Get an index of (optionally filtered) campaign reportbacks from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-reportback-collection
     *
     * @param array|string $query - query string, for filtering results
     * @return array - JSON response
     */
    public function getAllReportbacks(array $query = [])
    {
        $path = 'v1/reportbacks';

        return remember(make_cache_key('legacy-'.$path, $query), $this->cacheExpiration, function() use ($path, $query) {
            return $this->get($path, $query);
        });
    }

    /**
     * Get details for a particular reportback from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-specific-reportback
     *
     * @param $reportback_id
     * @return array - JSON response
     */
    public function getReportback($reportback_id)
    {
        $path = 'v1/reportbacks/'.$reportback_id;

        return remember(make_cache_key('legacy-'.$path), $this->cacheExpiration, function() use ($path) {
            return $this->get($path);
        });
    }

    /**
     * Store or update a user's reportback on the Drupal site.
     * @see: https://github.com/DoSomething/dosomething/wiki/API#campaign-reportback
     *
     * @param string $user_id - UID of user on the Drupal site
     * @param string $campaign_id - NID of campaign on the Drupal site
     * @param array $contents - Contents of reportback
     *   @option string $quantity - Quantity of reportback
     *   @option string $why_participated - Why the user participated in this campaign
     *   @option string $file - Reportback image as a Data URL
     *
     * @return array - API response
     */
    public function storeReportback($user_id, $campaign_id, $contents)
    {
        return $this->post('v1/campaigns/'.$campaign_id.'/reportback', [
            'uid' => $user_id,
            'quantity' => $contents['quantity'],
            'why_participated' => $contents['why_participated'],
            'file' => $contents['file'],
            'filename' => str_random(10).'.jpg', // Hackz. This sets the filename Phoenix saves reportback with.
            'caption' => $contents['caption'],
            'source' => $contents['source'],
        ]);
    }
}
