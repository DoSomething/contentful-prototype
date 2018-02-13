<?php

namespace App\Providers;

use Illuminate\Routing\Router;
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

        // Add a `redirect` helper to the Router.
        $router->macro('redirect', function ($from, $to) use ($router) {
            return $router->get($from, function ($bindings = []) use ($to, $router) {
                // Replace any bindings in the redirect destination as well.
                $bindings = is_array($bindings) ? $bindings : [$bindings];
                $to = preg_replace_array('#\{\w+\}#', $bindings, $to);

                return redirect($to);
            });
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
