<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CacheController extends Controller
{
    /**
     * Clear the cached data for specified cacheId.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  string $cacheId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request, $cacheId)
    {
        $redirectUrl = $request->query('redirect') ?: url()->previous();

        if (has_staff_access()) {
            cache()->forget($cacheId);
            $message = $cacheId.' has been cleared from the cache';
        } else {
            $message = 'Hey, staff only please!';
        }

        return redirect($redirectUrl)->with('flash_message', ['class' => 'messages', 'text' => $message]);
    }
}
