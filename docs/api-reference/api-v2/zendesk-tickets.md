# Zendesk Tickets

{% api-method method="post" host="https://www.dosomething.org" path="/api/v2/zendesk-tickets" %}
{% api-method-summary %}
Create a Zendesk Ticket for an authenticated user.
{% endapi-method-summary %}

{% api-method-description %}
Fetches user data via northstar then creates or updates a Zendesk user using the account email address with Northstar ID and Rogue profile URL.
Creates new Zendesk ticket for the user with the campaign title and question data. Assigns a group ID using the campaign's first Cause Name to match an existing Zendesk Group.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="campaign_id" type="string" required=true %}
e.g.: '9001'
{% endapi-method-parameter %}
{% api-method-parameter name="campaign_name" type="string" required=true %}
e.g.: 'Teens for Jeans'
{% endapi-method-parameter %}
{% api-method-parameter name="question" type="string" required=true %}
e.g.: 'I\'m having trouble reporting back on this campaign.'
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```json
{
  "ticket": {
    "id": 1234,
    "subject": "My printer is on fire!"
    // ...
  }
}
```

{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
This endpoint utilizes the [zendesk-laravel](https://github.com/huddledigital/zendesk-laravel) package.
To configure, make sure the following ENV variables are set in `.env`:
`ZENDESK_SUBDOMAIN`, `ZENDESK_USERNAME`, `ZENDESK_TOKEN`.
{% endhint %}

{% hint style="info" %}
To test this endpoint without cluttering our Zendesk space, set the question to `'causeyhippo'` (which will trigger the ticket to be tagged and resolved as a test).
{% endhint %}
