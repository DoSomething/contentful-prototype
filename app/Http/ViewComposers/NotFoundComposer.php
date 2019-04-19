<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;

class NotFoundComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
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
            'page' => get_not_found_page_settings($content_type, $slug),
        ]);
    }
}