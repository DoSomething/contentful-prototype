# Badges

## Overview

Badges are awarded to users based on actions they have taken.

## Who Gets Badges

The following users will NOT have a chance to be opted-in to the badges experience:

-   Users who have `utm_source:clubs` in their `source_detail`
-   Users who have particular campaigns in their `source_detail` (these excluded campaigns come from the `DS_CONTENTFUL_IDS_FOR_CAMPAIGNS_WITH_NO_BADGES` feature flag in _Northstar_) - currently the only excluded campaign is for teachers, who do not need badges

## Current Badges

Unless specified, badges will only show up in the Badges tab of the user profile.

-   **1 Signup** - Awarded after the user's first signup. This will also show up in the signup affirmation modal.
-   **1 Action** - Awarded after the user's first post is submitted. This will also show up in the reportback affirmation modal.
-   **2 Actions** - Awarded after the user's second post is submitted. This will also show up in the reportback affirmation modal.
-   **3 Actions** - Awarded after the user's third post is submitted. This will also show up in the reportback affirmation modal.
-   **1 Staff Fave** - This badge remains hidden until earned. Awarded when a post gets tagged with `good-submission`.
-   **2 Staff Faves** - This badge remains hidden until earned. Awarded when a second post gets tagged with `good-submission`.
-   **3 Staff Faves** - This badge remains hidden until earned. Awarded when a third post gets tagged with `good-submission`.
-   **News Expert** - Awarded when a user's `email_subscription_topics` contains "news" (which means that they are subscribed to The Breakdown)

## Viewing Badges

### Profile

Users will have a "Badges" tab in their profile. Clicking on a badge pulls up a modal which gives more information on how a badge was earned or how to earn it.

![Badges Tab In Profile Example](../../.gitbook/assets/badges-tab.png)

### Signup Affirmation Modal

If a user earns a badge upon signing up for a campaign, the badge will be displayed in the signup affirmation modal.

![Badge In Signup Affirmation Modal Example](../../.gitbook/assets/badge-signup-affirmation.png)

### Reportback Affirmation Modal

If a user earns a badge upon submitting a post, it will show up in the `PostCreatedModal`.

![Badge In Post Created Modal Example](../../.gitbook/assets/badge-post-created-modal.png)

## Iterations

### Badges Version 1 (current version)

This verions opts 70% of _new_ users into the badge experience, unless excluded (club referrals are excluded as are users from certain campaigns).

In this version _badges are not stored anywhere_. Each time we display a badge, we are calculating on the fly if the user has earned that badge. The good thing about this is that we don't have to worry about revoking badges (like if someone unsubscribes from The Breakdown) because that will happen automatically. The bad thing is that there is no easy way to answer questions like "How many badges does this user have?"

There is currently no easy way for an admin to see which badges a user has, though they can see if users are getting the badges experience or not.

### Badges Version 2

Coming soon!

### Retired Badges (badges in a past life)

-   **Registered Voter** - Awarded when a user's `voter_registration_status` is `CONFIRMED` (they told us they are registered) or `REGISTRATION_COMPLETE` (they registered through us)
