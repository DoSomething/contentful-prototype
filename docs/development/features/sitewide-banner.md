# Site Wide Banner (aka HowdyBar/HolaBar)

## Overview

This is a banner feature that is displayed site wide when turned on. In the past, we partnered with a 3rd party service to achieve this (HelloBar), but ran into some unforeseen and hard to troubleshoot bugs. And so, HowdyBar was born!

We use this feature to display important info to our users in a prominent banner across the top of the site. It is currently hardcoded to link to our [voter registration portal](/development/features/voter-registration.md#voting-portal).

The `SitewideBanner` can be used in conjunction with a `DismissableElement` or other wrapper components. We currently display the `SitewideBanner` via the `PopoverDispatcher`, which keeps track of what kind of banner or popover should be displayed on different pages.

## Suppressing from Pages

In certain cases, you may want to hide the sitewide banner on specific pages of the site. If that's the case, you'll simply need to add the URL path as a _string_ to `components/utilities/PopoverDispatcher/config` in the `siteWideBannerExcludedPaths` collection.

Before the banner renders on the page, we check the config for any pages that should be suppressed.

## Displaying Sitewide banner content

The content that will be displayed on the banner currently depends on a few variables. We check for users that have self reported either `confirmed` or `uncertain` when registering with us. If they have either as their voter registration status, they'll see a specific copy to encourage them to double check their status.

Besides self reporting, we check if the user is authenticated and their voter registration status. If the user has a voter registration status of `unregistered` or they have no status saved to their profile, the banner will display content prompting the user to register to vote.

If their status is `registration_complete` we will display another action - For example we've displayed a `Refer-A-Friend` banner in lieu of of the voter registration prompt.

All pathnames can be found here:[excluded path](https://github.com/DoSomething/phoenix-next/blob/master/resources/assets/components/utilities/PopoverDispatcher/config.js)
