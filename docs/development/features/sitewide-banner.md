# Site Wide Banner (aka HowdyBar/HolaBar)

## Overview

This is a banner feature that is displayed site wide when turned on. In the past, we partnered with a 3rd party service to achieve this (HelloBar), but ran into some unforeseen and hard to troubleshoot bugs. And so, HowdyBar was born!

We use this feature to display important info to our users in a prominent banner across the top of the site. It is currently hardcoded to link to our [go greener campaign](https://www.dosomething.org/us/campaigns/go-there-greener).

The `SitewideBanner` can be used in conjunction with a `DismissableElement` or other wrapper components. We currently display the `SitewideBanner` via the `PopoverDispatcher`, which keeps track of what kind of banner or popover should be displayed on different pages.

## Suppressing from Pages

In certain cases, you may want to hide the sitewide banner on specific pages of the site. If that's the case, you'll simply need to add the URL path as a _string_ to `components/utilities/PopoverDispatcher/config` in the `siteWideBannerExcludedPaths` collection.

Before the banner renders on the page, we check the config for any pages that should be suppressed.

## Displaying Sitewide banner content

The content that will be displayed on the banner is currently our refer a friend page, but this feature has been used in the past to display a variety of Voter Registration CTA's based on a users voter registration status (`confirmed`, `uncertain`, `registration_complete`, etc)

All pathnames where the banner is suppressed can be found here:[excluded path](https://github.com/DoSomething/phoenix-next/blob/master/resources/assets/components/utilities/PopoverDispatcher/config.js)
