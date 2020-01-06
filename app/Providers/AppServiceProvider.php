<?php

namespace App\Providers;

use Illuminate\Http\Response;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
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

        // A simple $response->cacheableWhenAnonymous() macro:
        Response::macro('cacheableWhenAnonymous', function ($seconds = 5 * 60) {
            // If this is an anonymous request, this macro tells Fastly to cache for
            // N seconds so we can handle sudden traffic spikes, e.g. https://git.io/fjs2W
            if (Auth::guest()) {
                $this->setPublic()->setSharedMaxAge($seconds);
            }

            return $this;
        });

        // Attach "client-safe" environment variables to views.
        View::composer('*', function ($view) {
            $view->with('env', [
                'APP_ENV' => config('app.env'),
                'FACEBOOK_APP_ID' => config('services.analytics.facebook_id'),
                'GRAPHQL_URL' => config('services.graphql.url'),
                'NORTHSTAR_URL' => config('services.northstar.url'),
                'NPS_SURVEY_ENABLED' => config('services.timed_modals.nps_survey.enabled'),
                'PHOENIX_URL' => config('app.url'),
                'SIXPACK_BASE_URL' => config('services.sixpack.url'),
                'SIXPACK_COOKIE_PREFIX' => config('services.sixpack.prefix'),
                'SIXPACK_ENABLED' => config('services.sixpack.enabled'),
                'SIXPACK_TIMEOUT' => config('services.sixpack.timeout'),
                'VOTER_REG_MODAL_ENABLED' => config('services.timed_modals.voter_reg_modal.enabled'),
                'CONTENTFUL_USE_PREVIEW_API' => config('contentful')['delivery.preview'],
            ]);
        });

        View::composer('*', function ($view) {
            $view->with('auth', [
                'isAuthenticated' => auth()->check(),
                'id' => auth()->id() ?: request()->query('user_id'),
                'token' => auth()->user() ? auth()->user()->access_token : null,
                'expiresAt' => auth()->user() ? auth()->user()->access_token_expiration : null,
                'role' => auth()->user() ? auth()->user()->role : 'user',
                'location' => request()->header('X-Fastly-Location-Code'),
                'postal_code' => request()->header('X-Fastly-Postal-Code'),
                'source' => request()->query('utm_source'),
                'now' => now()->timestamp,
            ]);
        });

        // Attach admin tool variables to 404 pages rendered via the ModelNotFoundException.
        View::composer('errors::404', 'App\Http\ViewComposers\NotFoundComposer');

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
        $this->app->singleton(\App\Http\Middleware\StartSession::class);

        $this->app->alias(DeliveryClient::class, 'contentful.delivery');
    }
}
