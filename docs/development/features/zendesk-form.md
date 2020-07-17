# Zendesk Form

The `ZendeskForm` component presents a form interface for authenticated users to submit questions to our Zendesk helpdesk.

It'll also present a link to the Campaign's FAQ page if available (& the user is signed up for the campaign), or our Help center otherwise.

The form submits via the internal `api/v2/zendesk-tickets` API which creates a new Zendesk Ticket for the user.

## Usage Instructions

Render the `<ZendeskFormContainer/>` component from any page with a valid `campaign` in Redux state.

Be sure to render the `ZendeskFormContainer` conditionally for authenticated users, since the zendesk tickets endpoint is gated and requires an authenticated user.

{% hint style="info" %}
If testing the Zendesk form, use 'causeyhippo' as the question text which will trigger an automatic resolve and categorization over in our Zendesk space.
{% endhint %}
