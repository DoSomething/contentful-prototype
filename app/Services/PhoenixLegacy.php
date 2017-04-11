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

        return $this->get($path, $query);
    }

    /**
     * Get a cached index of (optionally filtered) campaign signups from Phoenix.
     * @see: https://github.com/DoSomething/phoenix/wiki/API#retrieve-a-signup-collection
     *
     * @param array $query - query string, for filtering results
     * @return array - JSON response
     */
    public function getAllSignupsCached(array $query = [])
    {
        $path = 'v1/signups';

        // Use a lower expiration on this.
        $customCacheExpiration = 10;
        $cacheKey = 'legacy-' . $path . '-' . implode($query);

        return remember(make_cache_key($cacheKey), $customCacheExpiration, function() use ($path, $query) {
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
            'northstar_id' => $user_id,
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
        $query['load_user'] = true;
        if (auth()->id()) {
            $query['as_user'] = auth()->id();
        }

        return $this->get($path, $query);
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
            'file_url' => $contents['file_url'],
            'caption' => $contents['caption'],
            'quantity' => $contents['quantity'],
            'why_participated' => $contents['why_participated'],
            'source' => $contents['source'],
        ]);
    }

    /**
     * Store a reaction on a reportback item.
     * @see: https://github.com/DoSomething/phoenix/blob/dev/documentation/endpoints/kudos.md#create-a-kudos
     *
     * @param  string $reportback_item_id Reportback item ID on the Drupal site
     * @param  string $term_id            Reaction term ID on the Drupal site
     * @param  string $user_id            Northstar ID to react on behalf of
     * @return array                      API response
     */
    public function storeReaction($reportback_item_id, $term_id, $user_id)
    {
        return $this->post('v1/kudos', [
            'reportback_item_id' => $reportback_item_id,
            'term_ids' => [$term_id],
            'northstar_id' => $user_id,
        ]);
    }

    /**
     * Delete the given Reaction on the drupal site.
     *
     * @param  string $reaction_id Reaction ID on the Drupal site.
     * @return array               API response
     */
    public function deleteReaction($reaction_id)
    {
        return $this->delete('v1/kudos/'.$reaction_id);
    }

    /**
     * Get the activity for the given user and campaign.
     *
     * @param  string $user_id      User Northstar ID
     * @param  string $campaign_id  Legacy drupal campaign id
     * @return array               API response
     */
    public function getActivity($user_id, $campaign_id)
    {
        $path = 'v1/users/' . $user_id . '/activity';
        $query = ['nid' => $campaign_id];

        return $this->get($path, $query);
    }
}
