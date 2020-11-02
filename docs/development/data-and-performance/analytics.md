# Analytics

We track a series of analytics events and user interactions throughout the user session across the Phoenix application. These events are dispatched to various platforms, consumed by our data team and surfaced in [Google Analytics](https://analytics.google.com/analytics/web/#/report-home/a493209w819276p196748557) and [Looker](data.dosomething.org).

## Analytics Services

We use a few analytics services in Phoenix to track our events:

-   [Google Tag Manager](https://marketingplatform.google.com/about/tag-manager/). Events are also dispatched to GTM via the [Data Layer](https://support.google.com/tagmanager/answer/6164391?hl=en), and are dispatched over to Google Analytics).

-   [Snowplow](https://snowplowanalytics.com/). We dispatch events using the [Snowplow JS Tracker](https://github.com/snowplow/snowplow-javascript-tracker), which pushes events to our Snowplow config & data warehouse via [Fivetran](https://fivetran.com/).

-   [Customer.io](customer.io). We embed a [customer.io JS tracking snippet](https://git.io/JTdzk) to track [page views](https://customer.io/docs/pageviews) for authenticated users or users visiting a DoSomething SMS link (containing `utm_medium=sms` and `user_id` query parameters). _This excludes pages loaded without a full page refresh (e.g. switching tabs on the Account page), since the script is rendered from the server side on the initial page load_.

## Tracking an Event

_@TODO: Update this with the new naming conventions based on the assorted `metadata` parameters, and the [naming conventions](https://github.com/orgs/DoSomething/teams/deprecated-tech-leads/discussions/3)_

To track a new event, simply import the `trackAnalyticsEvent` method from `/resources/assets/helpers/analytics.js` and pass it an object containing the following fields:

-   `metadata`: an object containing the `noun`, `verb`, optional `adjective`, `category`, `target`, and optional `label`.
-   `context` _(optional)_: an object containing contextual event information e.g. the `pageId` where the event took place.
-   `service` _optional_: define the singular service to track the event (e.g. `ga`). (The event will be dispatched to _all_ services by default).

See listed events below for some examples.

## Phoenix Events

The following are all events currently tracked across the Phoenix application (this is _not_ an exhaustive list):

| Event Name                                           | Event Description                                                                                                                    | Platforms    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `phoenix_clicked_signup`                             | clicked to signup for a campaign on Phoenix                                                                                          | GA, Snowplow |
| `phoenix_clicked_share_facebook`                     | clicked a Facebook share button                                                                                                      | GA, Snowplow |
| `phoenix_cancelled_share_facebook`                   | canceled (or unsuccessful with) a Facebook share                                                                                     | GA, Snowplow |
| `phoenix_completed_share_facebook`                   | successfully completed sharing on Facebook                                                                                           | GA, Snowplow |
| `phoenix_clicked_share_twitter`                      | clicked a Twitter share button                                                                                                       | GA, Snowplow |
| `phoenix_clicked_share_facebook_messenger`           | clicked a Facebook Messenger share button                                                                                            | GA, Snowplow |
| `phoenix_cancelled_share_facebook_messenger`         | canceled (or was unsuccessful with) a Facebook Messenger share                                                                       | GA, Snowplow |
| `phoenix_completed_share_facebook_messenger`         | successfully completed sharing on Facebook Messenger                                                                                 | GA, Snowplow |
| `phoenix_failed_redirect_facebook_messenger_app`     | failed to be redirected to the Facebook Messenger App after clicking on the Facebook Messenger share button (applies to mobile only) | GA, Snowplow |
| `phoenix_successful_redirect_facebook_messenger_app` | successfully redirected to the Facebook Messenger App after clicking on the Facebook Messenger share button (applies to mobile only) | GA, Snowplow |
| `phoenix_clicked_share_email`                        | clicked an Email share button                                                                                                        | GA, Snowplow |
| `phoenix_clicked_share_action_facebook`              | clicked a facebook share button on a Share Action                                                                                    | GA, Snowplow |
| `phoenix_cancelled_share_action_facebook`            | canceled (or unsuccessful with) a Facebook share from a Share Action                                                                 | GA, Snowplow |
| `phoenix_completed_share_action_facebook`            | Successfully completed sharing on Facebook from a Share Action                                                                       | GA, Snowplow |
| `phoenix_clicked_share_action_twitter`               | clicked a Twitter share button on a Share Action                                                                                     | GA, Snowplow |
| `phoenix_clicked_link_action`                        | clicked the link on a Link Action                                                                                                    | GA, Snowplow |
| `phoenix_clicked_voter_registration_action`          | clicked the button on a Voter Registration Action                                                                                    | GA, Snowplow |
| `phoenix_submitted_photo_submission_action`          | submitted a Photo Reportback                                                                                                         | GA, Snowplow |
| `phoenix_submitted_text_submission_action`           | submitted a Text Reportback                                                                                                          | GA, Snowplow |
| `phoenix_submitted_share_social_submission_action`   | submitted a Social Share Reportback                                                                                                  | GA, Snowplow |
| `phoenix_submitted_referral_submission_action`       | submitted a Referral Reportback                                                                                                      | GA, Snowplow |
| `phoenix_clicked_poll_locator`                       | clicked the search button on a Poll Locator                                                                                          | GA, Snowplow |
| `phoenix_opened_modal`                               | opened a Modal (The specific modal ID is tracked within the `context` payload as `modalType`)                                        | GA, Snowplow |
| `phoenix_submitted_quiz`                             | submitted a quiz                                                                                                                     | GA, Snowplow |
| `phoenix_abandoned_quiz`                             | abandoned a quiz before completion                                                                                                   | GA, Snowplow |
| `phoenix_opened_modal_poll_locator`                  | opened a modal on a Poll Locater (the modal could contain poll location results or be empty)                                         | GA, Snowplow |
| `phoenix_opened_modal_poll_locator_not_found`        | opened the 'Not Found' modal from a Poll Locator                                                                                     | GA, Snowplow |
| `phoenix_clicked_copy_to_clipboard`                  | clicked the clipboard copy button in a Social Drive Action                                                                           | GA, Snowplow |
| `phoenix_failed_post_request`                        | failed to send a POST request                                                                                                        | GA, Snowplow |
| `phoenix_focused_text_submission_action_text`        | focused on the text field in a Text Submission Action form                                                                           | GA, Snowplow |
| `phoenix_clicked_call_to_action_banner`              | clicked on the button in a CTA Banner                                                                                                | GA, Snowplow |
| `phoenix_clicked_call_to_action_popover`             | clicked on the button in a CTA Popover                                                                                               | GA, Snowplow |

{% hint style="info" %}
We also track a Google Analytics [Pageview event](https://support.google.com/analytics/answer/6086080?hl=en) for every page view
{% endhint %}

### List of Waypoint events being tracked in Phoenix

Here's a list of active [waypoint events]('../features/analytics-waypoint.md') labeled by their respective `context.name`s:

-   `petition_submission_action-top`, `petition_submission_action-bottom`
-   `text_submission_action-top`, `text_submission_action-top`
-   `section_block-top`, `section_block-bottom`
-   `voter_registration_action-top`, `voter_registration_action-bottom`
-   `share_action-top`, `share_action-bottom`
-   `link_action-top`, `link_action-bottom`
-   `photo_submission_action-top`, `photo_submission_action-bottom`
-   `landing_page_cta-top`, `landing_page_cta-bottom`
-   `embed-top`, `embed-bottom`

### Events tracked by [Northstar](https://github.com/DoSomething/northstar)

| Event Name                                     | Event Description                                                                           | Platforms    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------ |
| `northstar_clicked_login`                      | clicked the 'Log In' button linking to the log in form                                      | GA, Snowplow |
| `northstar_clicked_register`                   | clicked the 'Create a DoSomething.org account' link                                         | GA, Snowplow |
| `northstar_clicked_forgot_password`            | clicked the 'Forgot your password?' link                                                    | GA, Snowplow |
| `northstar_clicked_login_facebook`             | clicked the Facebook auth button                                                            | GA, Snowplow |
| `northstar_clicked_login_google`               | clicked the Google auth button                                                              | GA, Snowplow |
| `northstar_failed_validation`                  | Form was submitted but returned with validation errors (from the backend)                   | GA, Snowplow |
| `northstar_focused_field_[field_name]`         | focused on a text field in the form.                                                        | GA, Snowplow |
| `northstar_submitted_edit_profile`             | submitted the edit profile form                                                             | GA, Snowplow |
| `northstar_submitted_forgot_password`          | clicked the Request New Password button or hit Enter key to submit the forgot password form | GA, Snowplow |
| `northstar_submitted_login`                    | submitted the login form                                                                    | GA, Snowplow |
| `northstar_submitted_reset_password`           | submitted the password reset form                                                           | GA, Snowplow |
| `northstar_submitted_register`                 | submitted the registration form                                                             | GA, Snowplow |
| `northstar_triggered_error_field_[field_name]` | inline validation error for specific input field                                            | GA, Snowplow |
| `northstar_triggered_error_submit_register`    | register form was submitted but rejected inline due to validation errors                    | GA, Snowplow |
| `northstar_triggered_suggestion_field_email`   | email field on registration form triggered a domain fix suggestion                          | GA, Snowplow |
| `northstar_used_suggestion_field_email`        | used the suggested fix for the email field                                                  | GA, Snowplow |
