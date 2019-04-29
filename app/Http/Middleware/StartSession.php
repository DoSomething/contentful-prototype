<?php

namespace App\Http\Middleware;

use Illuminate\Session\Middleware\StartSession as Middleware;

class StartSession extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        $isAnonymousSession = ! $request->cookies->has(config('session.cookie'));
        $isAuthenticating = $request->path() === 'next/login';

        // If we don't have a session cookie (or otherwise need to persist things
        // between requests, like in login flow), use the 'array' driver.
        if ($isAnonymousSession && ! $isAuthenticating) {
            config(['session.driver' => 'array']);
        }

        return parent::handle($request, $next);
    }
}
