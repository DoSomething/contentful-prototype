<?php

namespace App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Contentful\Delivery\Client as DeliveryClient;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @param Router $router
     * @return void
     */
    public function boot(Router $router)
    {
        // @see: https://laravel-news.com/laravel-5-4-key-too-long-error
        Schema::defaultStringLength(191);

        // Attach "client-safe" environment variables to views.
        View::composer('*', function ($view) {
            $view->with('env', [
                'APP_ENV' => config('app.env'),
                'FACEBOOK_APP_ID' => config('services.analytics.facebook_id'),
                'GRAPHQL_URL' => config('services.graphql.url'),
                'NORTHSTAR_URL' => config('services.northstar.url'),
                'NPS_SURVEY_ENABLED' => config('services.timed_modals.nps_survey.enabled'),
                'PHOENIX_URL' => config('app.url'),
                'PUCK_URL' => config('services.analytics.puck_url'),
                'SIXPACK_BASE_URL' => config('services.sixpack.url'),
                'SIXPACK_COOKIE_PREFIX' => config('services.sixpack.prefix'),
                'SIXPACK_ENABLED' => config('services.sixpack.enabled'),
                'SIXPACK_TIMEOUT' => config('services.sixpack.timeout'),
                'VOTER_REG_MODAL_ENABLED' => config('services.timed_modals.voter_reg_modal.enabled'),
                'CONTENTFUL_USE_PREVIEW_API' => config('contentful')['delivery.preview'],
            ]);
        });

        View::composer('*', function ($view) {
            // Read Fastly's geolocation headers for location-based features,
            // and check that they look like valid ISO-3601-2 codes.
            $country = request()->header('X-Fastly-Country-Code');
            if (strlen($country) !== 2) {
                $country = null;
            }

            $region = request()->header('X-Fastly-Region-Code');
            if (! in_array(strlen($region), [2, 3])) {
                $region = null;
            }

            // Fix improper format for American territories <https://goo.gl/qzcMyb>:
            if (in_array($country, ['AS', 'GU', 'MP', 'PR', 'UM', 'VI'])) {
                $region = $country;
                $country = 'US';
            }

            $view->with('auth', [
                'isAuthenticated' => auth()->check(),
                'id' => auth()->id() ?: request()->query('user_id'),
                'token' => auth()->user() ? auth()->user()->access_token : null,
                'expiresAt' => auth()->user() ? auth()->user()->access_token_expiration : null,
                'role' => auth()->user() ? auth()->user()->role : 'user',
                'location' => $country && $region ? $country . '-' . $region : null,
                'source' => request()->query('utm_source'),
                'now' => now()->timestamp,
            ]);
        });

        // Attach admin tool variables to 404 pages rendered via the ModelNotFoundException.
        View::composer('errors::404', function ($view) {
            // Split path string by '/', and remove the 'us' prefix.
            $path = explode('/', str_replace('us/', '', request()->path()));

            // Safely hard return in case we end up here with no path elements.
            if (! count($path)) {
                return;
            }

            if (count($path) === 1) {
                // Paths with a single :slug are processed as pages.
                $content_type = 'page';
                $slug = $path[0];
            } else {
                // Otherwise, we presume a path of ':category/:slug'.
                $content_type = get_content_type_by_category($path[0]);
                // For campaigns, the :category will not be part of the actual entry's slug (used in the cache ID).
                $slug = $content_type === 'campaign' ? $path[1] : $path[0].'/'.$path[1];
            }

            $view->with('admin', [
                'page' => [
                    'cacheUrl' => get_cache_url($content_type, $slug),
                    'type' => request()->path(),
                    'editUrl' => get_contentful_url().'entries?searchText='.$slug,
                ],
            ]);
        });

        // Attach the user & request ID to context for all log messages.
        // @TODO Re-enable this once we resolve https://www.pivotaltracker.com/story/show/165315689.
        // Log::getMonolog()->pushProcessor(function ($record) {
        //     $record['extra']['user_id'] = auth()->id();
        //     $record['extra']['client_id'] = token()->client();
        //     $record['extra']['request_id'] = request()->header('X-Request-Id');

        //     return $record;
        // });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->alias(DeliveryClient::class, 'contentful.delivery');
    }
}
