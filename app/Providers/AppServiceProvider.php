<?php

namespace App\Providers;

use Illuminate\Routing\Router;
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
                'GLADIATOR_URL' => config('services.gladiator.url'),
                'NORTHSTAR_URL' => config('services.northstar.url'),
                'NPS_SURVEY_ENABLED' => config('services.timed_modals.nps_survey.enabled'),
                'PHOENIX_LEGACY_URL' => config('services.phoenix-legacy.url'),
                'PHOENIX_URL' => config('services.phoenix.url'),
                'PUCK_URL' => config('services.analytics.puck_url'),
                'SIXPACK_BASE_URL' => config('services.sixpack.url'),
                'SIXPACK_COOKIE_PREFIX' => config('services.sixpack.prefix'),
                'SIXPACK_ENABLED' => config('services.sixpack.enabled'),
                'SIXPACK_TIMEOUT' => config('services.sixpack.timeout'),
                'VOTER_REG_MODAL_ENABLED' => config('services.timed_modals.voter_reg_modal.enabled'),
            ]);
        });

        View::composer('*', function ($view) {
            $view->with('auth', [
                'isAuthenticated' => auth()->check(),
                'id' => auth()->id() ?: request()->query('user_id'),
                'token' => auth()->user() ? auth()->user()->access_token : null,
                'role' => auth()->user() ? auth()->user()->role : 'user',
                'source' => request()->query('utm_source'),
            ]);
        });
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
