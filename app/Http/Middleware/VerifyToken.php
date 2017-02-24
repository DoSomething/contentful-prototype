<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class VerifyToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $northstarId = $request->input('northstar_id');
        $accessToken = $request->input('access_token');

        if ($northstarId && $accessToken) {
            $user = User::find($northstarId);
            if ($user && $user->access_token === $accessToken) {
                Auth::setUser($user);
            }
        }

        return $next($request);
    }
}
