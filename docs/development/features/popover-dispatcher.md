# Popover Dispatcher

## Overview

This is a feature used to display various banners and popover elements throughout the site. It checks what type of page we're on based on it's pathname, and from there displays (or does not display) the correct element.

## Adding Pathnames to Dispatcher

In certain cases, you may want to hide an element on certain pages, in others the element should only be rendered on a few choice pages. By creating multiple collections of pathnames specific to the need of a particular popover element, it's easier to keep track of how many popovers are getting displayed on a single page etc.

Before a popover element renders on the page, we check the config for any pages that have specific instructions. ie. what type (if any) of element should be rendered.

If you want to suppress/include the element from/on a page that may have multiple sub paths but share the same base path, you'll need to add a `*` to the end of the pathname.

All pathnames can be found here:[popover paths](https://github.com/DoSomething/phoenix-next/blob/master/resources/assets/components/utilities/PopoverDispatcher/config.js)
