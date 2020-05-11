# Site Wide Banner (aka HowdyBar/HolaBar)

## Overview

This is a banner feature that is displayed site wide when turned on. In the past, we partnered with a 3rd party service to achieve this (HelloBar), but ran into some unforeseen and hard to troubleshoot bugs. And so, HowdyBar was born!

Use this feature to display important info to our users in a prominent banner across the top of the site. This can be used in conjunction with a `DissmissableElement` or other wrapper components.

_Currently, the Site Wide Banner is hidden behind the `DS_ENABLE_SITEWIDE_CTA` environment variable._

## Suppressing from Pages

In certain cases, you may want to hide the sitewide banner on specific pages of the site. If that's the case, you'll simply need to add the URL path as a _string_ to `components/utilities/SiteWideBanner/config`

Before the banner renders on the page, we check the config for any pages that should be suppressed.
