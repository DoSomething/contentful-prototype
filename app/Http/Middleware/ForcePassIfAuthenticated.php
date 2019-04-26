<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class ForcePassIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // If this is a logged-in user, set the 'dosomething_pass' cookie
        // so that we can use it in a "force pass" rule in Fastly. This
        // allows us to prevent authenticated users from seeing cached
        // content without having to "hack" Laravel's built-in session.
        if (Auth::check() && ! $request->cookie('dosomething_pass')) {
            Cookie::queue('dosomething_pass', '1', 120);
        }

        // And if a user logs out, they can be put back in the "anonymous"
        // group by removing the 'dosomething_pass' cookie:
        if (Auth::guest() && $request->cookie('dosomething_pass')) {
            Cookie::queue(Cookie::forget('dosomething_pass'));
        }

        return $next($request);
    }
}
