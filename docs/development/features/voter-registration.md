# Voter Registration

## Overview

We partner with [Rock The Vote](https://www.rockthevote.org) to register young people to vote on behalf of DoSomething.org, by redirecting to them to the Rock The Vote (RTV) registration website and appending our partner ID: `https://register.rockthevote.com/registrants/new?partner=37187`

Our importer app, [Chompy](https://www.github.com/dosomething/chompy) downloads all voter registrations created with our partner ID, and imports them as `voter-reg` posts by posting to the Rogue API. See [import docs](https://github.com/DoSomething/chompy/blob/master/docs/imports/rock-the-vote.md).

## Voting Portal

We host our voting portal, [vote.dosomething.org](https://vote.dosomething.org) on Instapage. It prompts user for their email and zip, and redirects them to the Rock The Vote registration URL with our partner ID, pre-populating the email and zip submitted from the form.

TODO: Link to doc about why we host on Instapage / Phoenix limitations

## Voter Registration Action

The `VoterRegistrationAction` content type can be used to display a call to action button that redirects a user to our vote.dosomething.org portal.

## Online Registration Drives

The call to action in the [Ready, Set, Vote campaign](https://www.dosomething.org/us/campaigns/online-registration-drive/) asks a member (the alpha) to get their friends to register to vote, by providing them with a custom URL to their own Online Voter Registration Drive (OVRD) that they can share with their friends (the betas).

### Current version

The campaign action page (aka the alpha page) uses a `SocialDriveAction` to customize the query parameters of the beta page -- which is hosted on our Instapage voting portal at https://vote.dosomething.org/member-drives.

An example complete custom link for an alpha with user ID 58e68d5da0bfad4c3b4cd722 will look like:

```
https://vote.dosomething.org/member-drive?userId=58e68d5da0bfad4c3b4cd722&r=user:58e68d5da0bfad4c3b4cd722,source:web,source_details:onlinedrivereferral,referral=true
```

### Upcoming version

In May 2020, we will release updated versions of both the alpha and beta OVRD pages.

### Alpha page

The OVRD (Ready Set Vote) campaign action page will still be used as the alpha page, except we render a hardcoded template instead of the Contentful blocks field. This is hardcoded because it displays one-off features, such as a list of the beta's that the alpha has gotten to register to vote via their OVRD, that we don't need to make re-usable by other campaigns or pages at this time.

We hardcode specific configuration `ContentBlock` ID's and Action ID's:

**Production:**

Content:

- [How To Share ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/entries/3fj7mXlyrcJZ3mUKXqco1R) - 3fj7mXlyrcJZ3mUKXqco1R
- [FAQ ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/entries/1nLV3YUhLzJdlcGrd2Mq9N) - 1nLV3YUhLzJdlcGrd2Mq9N

Total scholarship entries:

- [Share Photo Post Action](https://activity.dosomething.org/actions/1025) - 1025

**Dev:**

Content:

- [How To Share ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/environments/dev/entries/1xcG1CTinKwn3Iyxtcc0f4) - 1xcG1CTinKwn3Iyxtcc0f4
- [FAQ ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/environments/dev/entries/6H22Y1wmICy05pM9twIGGR) - 6H22Y1wmICy05pM9twIGGR

Total scholarship entries:

- [Share Photo Post Action](https://activity-dev.dosomething.org/actions/27) - 27

### Beta page

We'll host the beta page internally in Phoenix instead of Instapage, at path `/us/my-voter-registration-drive?referrer_user_id=58e68d5da0bfad4c3b4cd722` (where the `referrer_user_id` is our alpha's user ID).

This beta page is a hardcoded template, but shares some components with the OVRD campaign template, like its `CoverImage` and scholarship information. The OVRD campaign's contentful ID, `3pwxnRZxociqMaQCMcGOyc`, is the same in all of our `dev`, `qa` and `production` spaces. Usually this isn't the case -- our Contentful ID's don't match between our `dev` and `production` spaces -- but this entry was created before we introduced different Contentful environments to our Phoenix space. Because of this, we're able to hardcode this Contentful ID to use in both `dev` and `production` environments.

We hardcode specific configuration `ContentBlock` ID's:

**Production:**

- [Register To Vote ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/entries/2d2i2M3yn4RB9pZYVzQxGm) - 2d2i2M3yn4RB9pZYVzQxGm
- [FAQ ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/entries/4yP8BdIdiGU0qwZaFyzmsm) - 4yP8BdIdiGU0qwZaFyzmsm
- [OVRD Campaign Link ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/entries/30rCn63G1rnpzojCXC9PmF) - 30rCn63G1rnpzojCXC9PmF

**Dev:**

Content:

- [Register To Vote ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/environments/dev/entries/bt0jUBYJaKoi1oab25Wmx) - bt0jUBYJaKoi1oab25Wmx
- [FAQ ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/environments/dev/entries/3cXc0RPMVNeE4surEqFujL) - 3cXc0RPMVNeE4surEqFujL
- [OVRD Campaign Link ContentBlock](https://app.contentful.com/spaces/81iqaqpfd8fy/environments/dev/entries/3p2qz2JPCvgVitgRVBoMFz) - 3p2qz2JPCvgVitgRVBoMFz

## Tracking Source

TODO: Document how the `r` query parameter is used by the Chompy import.

## Quiz

### Voting Quiz Campaign

Our Voting Quiz campaign (`/us/campaigns/ready-vote`) uses the legacy Quiz content type, which has been deprecated for Typeform except for this one warrior entry. It has two entry points:

- Gated: `/us/campaigns/ready-vote` - user must signup to take the quiz from the action page

- Ungated: `/us/campaigns/ready-vote/quiz/ready` - user can take quiz but must signup to see their result

### Quiz Result Page

We're working on a new release to redirect users to `/us/quiz-results/:id` to view their quiz result if the `DS_ENABLE_QUIZ_RESULT_PAGE` configuration variable is set to `true`.

The page displays a new `QuizResultPage` component, and expects the `:id` route parameter to be the ID of one of the Link Action entries referenced by the Quiz's `resultBlocks` multi-value reference field.

The `QuizResultPage` displays a static `GalleryBlock` for all of the different result ID's.

**Production**

Gallery Block: 78WaGsvDEzAxnreEvNx3Za

Quiz Results:

| id                     | title               | internalTitle      | assetId                |
| ---------------------- | ------------------- | ------------------ | ---------------------- |
| p7hqjSP4Y1U6ad0UDz4iS  | Shell-tered Voter   | Vote By Mail       | 49Y4ucuGbJbgZL7IDDfxG0 |
| 1giTEF3B2hO2CyccmhlVDm | Hare Who Dares      | In-Person Voting   | 2f2kgaHl9w5VtdswKkaBWT |
| 21PDBge2bKCTWMe5f9eo1H | Sloth At a Loss     | Unsure of Voting   | 1YomtHAeqXJ3qbjQNgsM0v |
| 14KfeAs265httjNMf1jwTw | Moral Support Panda | Ineligible to Vote | 3WjT0QGNnJEPPz2yMd3inj |

**Dev**

Gallery Block: 2VGFq3XBcqCfKOA8mC5mP4

Quiz Results:

| id                     | title               | internalTitle    | assetId                |
| ---------------------- | ------------------- | ---------------- | ---------------------- |
| 347iYsbykgQe6KqeGceMUk | Moral Support Panda | Super Motivated  | 6J13jUL4YGGC1fyYMNEfbc |
| 1lvJHhlJqQSgKgwIwUymQ8 | Shell-tered Voter   | Social Voter     | 3iLKsRlFQ1k9ddQbRb3RN8 |
| 2KfkCOTi7u4CqAyyCuGyci | Hare Who Dares      | Election Dabbler | 3uB88eZmTNEaoFxV9pZ8hX |

**Related links**

- [User Flows For Voting Quiz](https://docs.google.com/spreadsheets/d/10uIZNghJTMKWR0lk5_y-q9-NwabDKYyrf8Vxlj17S9c/edit#gid=1453114542)

- [Quiz documentation](https://github.com/DoSomething/phoenix-next/blob/8b5a97fdd973c8eb925191f78b36c2f676d2707a/docs/content-publishing/quiz.md) - This was removed in [#1369](https://github.com/DoSomething/phoenix-next/pull/1369) when we moved editorial guides into the Campaign Playbook.

**Notes**

- Please avoid editing the Quiz entries if possible, as [they are delicately configured](https://github.com/DoSomething/phoenix-next/blob/8b5a97fdd973c8eb925191f78b36c2f676d2707a/docs/content-publishing/quiz.md#adding-available-choices-for-question) (deleting one of the `LinkAction` entries referenced by the `resultBlocks` field would not be pretty).
