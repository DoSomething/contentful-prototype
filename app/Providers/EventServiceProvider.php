<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        // @TODO: Remove unless we end up needing `drupal_id` here again.
        // User::saving(function($user) {
        //  if ($user->legacy_id) return;
        //
        //  // If the User does not have a legacy Drupal id cached, fetch from Northstar.
        //  $northstarUser = gateway('northstar')->asClient()->getUser('id', $user->northstar_id);
        //  $user->legacy_id = $northstarUser->drupal_id;
        // $user->save();
        // });
    }
}
