# Environment Details & Behaviors

---

_Production_
URL: next.dosomething.org/us/campaigns/…

The only things that will show up on production are those that have been published in the Contentful campaign. If something is in Draft or Archived, they will not show on the live campaign.

_Thor_

URL: next-thor.dosomething.org/us/campaigns/…

On Thor, anything that is in Draft mode will show on the page. This allows you to queue up content changes without actually changing a live campaign, as well as identify if new content is an issue before publishing to Production.

Phoenix Next has an administration console that allows you to see all of the views a user would see through the campaign. Note that if you are clicking out to a modal, the behavior here will be incorrect as an administrator (it retriggers the "mock signup/unsignup button"). This is not indicative of how it will work for a user.

![Dashboard](../.gitbook/assets/dashboard.png)
