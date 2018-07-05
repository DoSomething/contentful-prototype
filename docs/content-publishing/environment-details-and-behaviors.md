# Environment Details & Behaviors

## Production

**URL**: `next.dosomething.org/us/campaigns/…`

The only things that will show up on production are those that have been _Published_ in the Contentful campaign. If something is in _Draft_ or _Archived_, they will not show on the live campaign.

## Preview \(aka: Thor\)

**URL**: `phoenix-preview.dosomething.org/us/campaigns/…`

On Preview \(aka: Thor\), anything that is in _Draft_ mode will show on the page. This allows you to queue up content changes without actually changing a live campaign, as well as identify if new content is an issue before publishing to Production.

Phoenix \(next\) has an administration console that allows you to see all of the views a user would see through the campaign. Note that if you are clicking out to a modal, the behavior here will be incorrect as an administrator \(it re-triggers the "mock signup/unsignup button"\). This is not indicative of how it will work for a user.
