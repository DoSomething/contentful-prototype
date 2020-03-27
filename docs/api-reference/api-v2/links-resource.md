---
description: List of API endpoints for the Links resource.
---

# Links Resource

{% api-method method="post" host="https://www.dosomething.org" path="/api/v2/links" %}
{% api-method-summary %}
Shorten a URL.
{% endapi-method-summary %}

{% api-method-description %}
The request is proxied to Bertly (http://github.com/dosomething/bertly) to shorten a given URL.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="url" type="string" required=true %}
e.g.: 'https://vote.dosomething.org/member-drive?r=user:58e68d5da0bfad4c3b4cd722,source:web,source_details:onlinedrivereferral,referral=true'
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```json
{
  "url": "https://dosome.click/ngzdjp",
  "count": 23
}
```

{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}
