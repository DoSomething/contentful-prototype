# Refer A Friend

## Overview

The Refer A Friend Feature provides members with a unique URL to share with their friends, to get them to register and signup for a campaign on DoSomething.org.

We commonly use these terms (in the business, and in code) when describing this feature:

- **Alpha** - The user who is sharing the URL with friends, prompting the friends to register
- **Beta** - The friends that the alpha is sharing the URL with

Both the alpha and beta may earn a reward for the beta registering and signing up for the campaign.

This feature is currently only live on the Teens For Jeans 2019 campaign, offering a second scholarship entry as the reward. Users who have `refer-friends-scholarship` feature flag set will see a Referral Page Banner after signing up for Teens For Jeans 2019, which refers them to their Alpha Referral Page.

## Details

This feature is hardcoded, and consists of three user-facing touch points:

### Referral Page Banner

After signing up for Teens For Jeans 2019, users who have the `refer-friends-scholarship` flag set will see a Referral Page Banner, which links them to the Alpha Referral Page.

![Referral Page Banner Example](../../.gitbook/assets/referral-page-banner.png)

### Alpha Referral Page

```
dosomething.org/us/refer-friends
```

The Alpha Referral Page provides the link to the Beta Referral Page, which is what the user should share with their friends. The Beta Referral Page link will contain the current user's Northstar ID as a `referrer_user_id` query parameter.

![Alpha Referral Page Example](../../.gitbook/assets/alpha-referral-page.png)

### Beta Referral Page

```
dosomething.org/join?referrer_user_id=55767609a59dbf3c7a8b4571
```

The Beta Referral Page links to campaigns that the beta should join, in order to receive the reward along with the alpha. The campaign link will contain the same `referrer_user_id` query parameter, which gets used by Northstar to set the `source_detail` of any beta user registrations.

![Beta Referral Page Example](../../.gitbook/assets/beta-referral-page.png)

## Iterations

The previous (and first) iteration of Refer A Friend offered a \$5 gift card reward to any beta who registered and signed up for a staff pick campaign, as well as the alpha that referred them.

The list of campaigns to display the referral page banner for was hardcoded into the codebase. The beta referral page URL would include a `campaign_id` query parameter, e.g.:

```
dosomething.org/us/join?user_id=:userId&campaign_id=9037
```

If this campaign ID matched a hardcoded referral page campaign, we'd link to this campaign in the first block on the Beta Referral Page.

If we want to add multiple referral campaigns again in the future, we should add a new boolean property to the Rogue campaign that indicates whether the campaign is a referral campaign.
