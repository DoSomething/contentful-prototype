# Analytics

We track a series of analytics events and user interactions throughout the user session across the Phoenix application. These events are dispatched to various platforms, consumed by our data team and surfaced in [Looker](data.dosomething.org).

## Analytics Services

We use two analytics services in Phoenix to track our events:

- [Puck](https://github.com/DoSomething/puck-client) is a DoSomething maintained open source JS analytics library which we use to track all of our events. The data is dispatched to and stored in our deployed Puck application which is ingested by the Data team and surfaced in Looker.

- [Google Analytics](https://analytics.google.com/analytics/web/). Most events are also dispatched to GA in addition to Page View events for each page visit on site.

## Event Naming

We've established the following naming conventions for any analytics event tracked in Phoenix:

**Rules**:

- event names must be snake-cased (lowercase with underscores).
- pattern: `app_verb_noun(\_adjective)`, the adjective is optional.
- event names assume a past tense for the verb ("clicked" instead of "click", "visited" instead of "visit", etc.)

See listed events below for some examples.

{% hint style="info" %}
For Google Analytics events, we track the event name as the 'Action', the noun prefixed by `phoenix_` as the 'Category', and the URL of the user as the 'Label'.
{% endhint %}

## Phoenix Events

The following are all events currently tracked across the Phoenix application:

| Event Name                                           | Event Description                                                                                                                    | Platforms |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `phoenix_clicked_signup`                             | clicked to signup for a campaign on Phoenix                                                                                          | Puck, GA  |
| `phoenix_clicked_share_facebook`                     | clicked a Facebook share button                                                                                                      | Puck, GA  |
| `phoenix_cancelled_share_facebook`                   | canceled (or unsuccessful with) a Facebook share                                                                                     | Puck, GA  |
| `phoenix_completed_share_facebook`                   | successfully completed sharing on Facebook                                                                                           | Puck, GA  |
| `phoenix_clicked_share_twitter`                      | clicked a Twitter share button                                                                                                       | Puck, GA  |
| `phoenix_clicked_share_facebook_messenger`           | clicked a Facebook Messenger share button                                                                                            | Puck, GA  |
| `phoenix_cancelled_share_facebook_messenger`         | canceled (or was unsuccessful with) a Facebook Messenger share                                                                       | Puck, GA  |
| `phoenix_completed_share_facebook_messenger`         | successfully completed sharing on Facebook Messenger                                                                                 | Puck, GA  |
| `phoenix_failed_redirect_facebook_messenger_app`     | failed to be redirected to the Facebook Messenger App after clicking on the Facebook Messenger share button (applies to mobile only) | Puck, GA  |
| `phoenix_successful_redirect_facebook_messenger_app` | successfully redirected to the Facebook Messenger App after clicking on the Facebook Messenger share button (applies to mobile only) | Puck, GA  |
| `phoenix_clicked_share_email`                        | clicked an Email share button                                                                                                        | Puck, GA  |
| `phoenix_clicked_share_action_facebook`              | clicked a facebook share button on a Share Action                                                                                    | Puck, GA  |
| `phoenix_cancelled_share_action_facebook`            | canceled (or unsuccessful with) a Facebook share from a Share Action                                                                 | Puck, GA  |
| `phoenix_completed_share_action_facebook`            | Successfully completed sharing on Facebook from a Share Action                                                                       | Puck, GA  |
| `phoenix_clicked_share_action_twitter`               | clicked a Twitter share button on a Share Action                                                                                     | Puck, GA  |
| `phoenix_clicked_link_action`                        | clicked the link on a Link Action                                                                                                    | Puck, GA  |
| `phoenix_clicked_voter_registration_action`          | clicked the button on a Voter Registration Action                                                                                    | Puck, GA  |
| `phoenix_submitted_photo_submission_action`          | submitted a Photo Reportback                                                                                                         | Puck, GA  |
| `phoenix_submitted_text_submission_action`           | submitted a Text Reportback                                                                                                          | Puck, GA  |
| `phoenix_submitted_share_social_submission_action`   | submitted a Social Share Reportback                                                                                                  | Puck, GA  |
| `phoenix_submitted_referral_submission_action`       | submitted a Referral Reportback                                                                                                      | Puck, GA  |
| `phoenix_clicked_poll_locator`                       | clicked the search button on a Poll Locator                                                                                          | Puck, GA  |
| `phoenix_opened_modal`                               | opened a Modal (The specific modal ID is tracked within the Puck payload)                                                            | Puck, GA  |
| `phoenix_submitted_quiz`                             | submitted a quiz (The quiz results are tracked within the Puck payload)                                                              | Puck, GA  |
| `phoenix_abandoned_quiz`                             | abandoned a quiz before completion                                                                                                   | Puck, GA  |
| `phoenix_opened_modal_poll_locator`                  | opened a modal on a Poll Locater (the modal could contain poll location results or be empty)                                         | Puck, GA  |
| `phoenix_opened_modal_poll_locator_not_found`        | opened the 'Not Found' modal from a Poll Locator                                                                                     | Puck, GA  |
| `phoenix_clicked_copy_to_clipboard`                  | clicked the clipboard copy button in a Social Drive Action                                                                           | Puck, GA  |
| `phoenix_failed_post_request`                        | failed to send a POST request                                                                                                        | Puck, GA  |
| `phoenix_focused_text_submission_action_text`        | focused on the text field in a Text Submission Action form                                                                           | Puck, GA  |

{% hint style="info" %}
We also track a Google Analytics [Pageview event](https://support.google.com/analytics/answer/6086080?hl=en) for every page view
{% endhint %}

### Events tracked internally by Puck

| Event Name         | Event Description                               | Platforms |
| ------------------ | ----------------------------------------------- | --------- |
| `visit`            | tracked anytime another Puck event is triggered | Puck      |
| `view`             | viewed a page                                   | Puck      |
| `waypoint reached` | reached a waypoint embedded on page             | Puck      |

### List of Waypoint events being tracked in Phoenix

{% hint style="info" %}
These events would be categorized under the `waypoint reached` event name.
The event's `data.waypointData` field will contain the `contentfulId` (ID of the contentful entry) for the specific block on the page. The following list will contain the individual `data.waypointName` values paired by the events being tracked for the viewport reaching the top and bottom of the respective blocks.
{% endhint %}

- `petition_submission_action-top`, `petition_submission_action-bottom`
- `text_submission_action-top`, `text_submission_action-top`
- `section_block-top`, `section_block-bottom`
- `voter_registration_action-top`, `voter_registration_action-bottom`
- `share_action-top`, `share_action-bottom`
- `link_action-top`, `link_action-bottom`
- `photo_submission_action-top`, `photo_submission_action-bottom`
- `landing_page_cta-top`, `landing_page_cta-bottom`
- `embed-top`, `embed-bottom`

### Events tracked by [Northstar](https://github.com/DoSomething/northstar)

| Event Name                                     | Event Description                                                                           | Platforms |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- | --------- |
| `northstar_clicked_login`                      | clicked the 'Log In' button linking to the log in form                                      | Puck, GA  |
| `northstar_clicked_register`                   | clicked the 'Create a DoSomething.org account' link                                         | Puck, GA  |
| `northstar_clicked_password_forgot`            | clicked the 'Forgot your password?' link                                                    | Puck, GA  |
| `northstar_clicked_login_facebook`             | clicked the Facebook auth button                                                            | Puck, GA  |
| `northstar_failed_validation`                  | Form was submitted but returned with validation errors (from the backend)                   | Puck, GA  |
| `northstar_focused_field_[field_name]`         | focused on a text field in the form.                                                        | Puck, GA  |
| `northstar_submitted_edit_profile`             | submitted the edit profile form                                                             | Puck, GA  |
| `northstar_submitted_forgot_password`          | clicked the Request New Password button or hit Enter key to submit the forgot password form | Puck, GA  |
| `northstar_submitted_login`                    | submitted the login form                                                                    | Puck, GA  |
| `northstar_submitted_reset_password`           | submitted the password reset form                                                           | Puck, GA  |
| `northstar_submitted_register`                 | submitted the registration form                                                             | Puck, GA  |
| `northstar_triggered_error_field_[field_name]` | inline validation error for specific input field                                            | Puck, GA  |
| `northstar_triggered_error_submit_register`    | register form was submitted but rejected inline due to validation errors                    | Puck, GA  |
| `northstar_triggered_suggestion_field_email`   | email field on registration form triggered a domain fix suggestion                          | Puck, GA  |
| `northstar_used_suggestion_field_email`        | used the suggested fix for the email field                                                  | Puck, GA  |

## Developer Info

To track a new event, simply import the `trackAnalyticsEvent` method from `/resources/assets/helpers/analytics.js` and pass it an object containing the `noun`, `verb`, `adjective` and optionally `data` and `service` fields.

The `service` can either be `ga` for Google analytics, `puck` for Puck and will default to track across both services.

The `data` field will be tracked along with the Puck event. Google analytics does not accept this data.
