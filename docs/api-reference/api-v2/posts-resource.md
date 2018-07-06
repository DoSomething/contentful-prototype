# Posts Resource

## Retrieve all Posts

```text
GET /api/v2/posts
```

The request is proxied to Rogue.

// @TODO add link to corresponding url params and response example from Rogue

{% api-method method="get" host="" path="/api/v2/posts/:id" %}
{% api-method-summary %}
Retrieve a Post
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-query-parameters %}
{% api-method-parameter name="test" type="string" required=false %}
1234
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
    "data": true
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



