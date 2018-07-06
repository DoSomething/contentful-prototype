---
description: List of API endpoints for the Posts resource.
---

# Posts Resource

{% api-method method="get" host="https://www.dosomething.org" path="/api/v2/posts" %}
{% api-method-summary %}
Retrieve all Posts
{% endapi-method-summary %}

{% api-method-description %}
Get index list of all posts.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
The request is proxied to Rogue.
{% endhint %}

{% api-method method="get" host="https://www.dosomething.org" path="/api/v2/posts/:id" %}
{% api-method-summary %}
Retrieve a Post
{% endapi-method-summary %}

{% api-method-description %}
Get a single post using a specified id.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
e.g.: 123456
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```

```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="danger" %}
Currently not fully implemented.
{% endhint %}

