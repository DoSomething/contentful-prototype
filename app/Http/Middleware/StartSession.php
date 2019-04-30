<?php

namespace App\Http\Middleware;

use Illuminate\Session\Middleware\StartSession as Middleware;

class StartSession extends Middleware
{
    /**
     * The URIs that require a persistent session.
     *
     * @var array
     */
    protected $mustPersistSession = [
        'next/login',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        // If we don't have a session cookie & aren't on a route that requires keeping a
        // persistent session between anonymous requests, use the 'array' driver.
        $isAnonymousSession = ! $request->cookies->has(config('session.cookie'));
        if ($isAnonymousSession && ! $request->is($this->mustPersistSession)) {
            config(['session.driver' => 'array']);
        }

        return parent::handle($request, $next);
    }
}
