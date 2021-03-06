---
description: List of API endpoints for the Campaigns resource.
---

# Campaigns Resource

{% api-method method="get" host="https://www.dosomething.org" path="/api/v2/campaigns" %}
{% api-method-summary %}
Retrieve all Campaigns
{% endapi-method-summary %}

{% api-method-description %}
Get an index list of all campaigns, filterable using query parameters.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-query-parameters %}
{% api-method-parameter name="filter\[id\]" type="string" required=true %}
e.g.: 37,6LQzMvDNQcYQYwso8qSkQ8
{% endapi-method-parameter %}
{% endapi-method-query-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "data": [
    {
      "id": "6LQzMvDNQcYQYwso8qSkQ8",
      "legacyCampaignId": "1144",
      "legacyCampaignRunId": "7430",
      "type": "campaign",
      "title": "[Test] Teens for Jeans",
      "slug": "test-teens-for-jeans",
      "status": null,
      "endDate": {
        "date": "2019-01-01 12:00:00.000000",
        "timezone_type": 1,
        "timezone": "-06:00"
      },
      "callToAction": "Let's collect another million jeans TOGETHER.",
      "tagline": "Let's collect another million jeans TOGETHER.",
      "coverImage": {
        "description": null,
        "url":
          "https://images.ctfassets.net/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg",
        "landscapeUrl":
          "https://images.ctfassets.net/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?w=1440&h=620&fm=jpg&fit=fill"
      },
      "actionText": "Join Now",
      "staffPick": null,
      "cause": null,
      "scholarshipAmount": null,
      "additionalContent": {
        "noun": {
          "plural": "jeans",
          "singular": "jean"
        },
        "verb": {
          "plural": "collected",
          "singular": "collected"
        }
      }
    },
    {
      "id": null,
      "legacyCampaignId": "37",
      "legacyCampaignRunId": "6188",
      "type": "campaign",
      "title": "Music March Out",
      "slug": null,
      "status": "active",
      "callToAction":
        "Run a musical walk out to defend music program funding at school.",
      "tagline":
        "Run a musical walk out to defend music program funding at school.",
      "coverImage": {
        "description": null,
        "url":
          "https://thor.dosomething.org/sites/default/files/styles/300x300/public/images/Music%20March%20Out%20square.jpg?itok=luE_GV4M",
        "landscapeUrl":
          "https://thor.dosomething.org/sites/default/files/styles/1440x810/public/images/Music%20March%20Out%20landscape.jpg?itok=EzoA7Zvn"
      },
      "staffPick": false,
      "cause": "education",
      "additionalContent": {
        "noun": {
          "singular": null,
          "plural": "Protesters"
        },
        "verb": {
          "singular": null,
          "plural": "Attended"
        }
      }
    }
  ]
}
```

{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="warning" %}
Currently, this endpoint only supports a filtered ID query and returns an abridged set of primary campaign fields to reduce the data load. There is a limit of 10 IDs per request; both Ashes and Contentful Campaign IDs are supported.
{% endhint %}

{% api-method method="get" host="https://www.dosomething.org" path="/api/v2/campaigns/:id" %}
{% api-method-summary %}
Retrieve a single Campaign
{% endapi-method-summary %}

{% api-method-description %}
Get a single campaign using a specified id.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
e.g.: 6LQzMvDNQcYQYwso8qSkQ8
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "data": {
    "id": "6LQzMvDNQcYQYwso8qSkQ8",
    "legacyCampaignId": "1144",
    "legacyCampaignRunId": "7430",
    "type": "campaign",
    "template": "mosaic",
    "title": "[Test] Teens for Jeans",
    "slug": "test-teens-for-jeans",
    "endDate": {
      "date": "2018-02-15 12:00:00.000000",
      "timezone_type": 1,
      "timezone": "-06:00"
    },
    "callToAction": "Let's collect another million jeans TOGETHER.",
    "tagline": "Let's collect another million jeans TOGETHER.",
    "blurb": "",
    "coverImage": {
      "description": null,
      "url":
        "https://images.contentful.com/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg",
      "landscapeUrl":
        "https://images.contentful.com/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?w=1440&h=620&fm=jpg&fit=fill"
    },
    "campaignLead": {
      "id": "4V3gy8KPBK4gAWuMGSKWuA",
      "type": "staff",
      "fields": {
        "name": "Adam Garner",
        "jobTitle": "Campaign Lead",
        "avatar":
          "https://images.contentful.com/81iqaqpfd8fy/5dN0SxEQrYeI8eKwOAOwia/179e972eae699c6377faa74d611a50a2/Adam_Garner_Headshot.png?w=600&h=600&fm=jpg&fit=fill",
        "email": "adam@dosomething.org"
      }
    },
    "affiliateSponsors": [],
    "affiliatePartners": [],
    "quizzes": [],
    "dashboard": null,
    "affirmation": null,
    "pages": [],
    "landingPage": null,
    "additionalContent": null,
    "allowExperiments": true,
    "actionText": "Join Us",
    "staffPick": null,
    "cause": null,
    "scholarshipAmount": null
  }
}
```

{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
The `id` can be either a Contentful ID or an Ashes Legacy ID.
{% endhint %}

{% api-method method="get" host="https://www.dosomething.org" path="/api/v2/campaigns/:id/posts" %}
{% api-method-summary %}
Retrieve all Posts for a Campaign
{% endapi-method-summary %}

{% api-method-description %}
Get an index list of all posts for a specified campaign.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
e.g.: 6LQzMvDNQcYQYwso8qSkQ8
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```text

```

{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
The request is proxied to Rogue and automatically adds the `filter[campaign_id]=:id` to the query params.
{% endhint %}

{% api-method method="post" host="https://www.dosomething.org" path="/api/v2/campaigns/:id/posts" %}
{% api-method-summary %}
Create a Post for a Campaign
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="id" type="string" required=true %}
e.g.: 3455
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```javascript
{
  "data": {
    "id": 123456,
    "signup_id": 9874563,
    "northstar_id": "551234567890abcdefghijkl",
    "media": {
      "url": "https://rogue-thor.dosomething.org/images/123456",
      "original_image_url":
        "https://ds-rogue-thor.s3.amazonaws.com/uploads/reportback-items/8496508-superlongstringidhere-1234567890.jpeg?time=1517330438",
      "caption": "Some awesome caption here!"
    },
    "quantity": "12",
    "tags": [],
    "reactions": {
      "reacted": false,
      "total": null
    },
    "status": "pending",
    "source": "sample-oauth",
    "remote_addr": "100.00.000.000",
    "created_at": "2018-01-30T16:40:37+00:00",
    "updated_at": "2018-01-30T16:40:37+00:00",
    "signup": {
      "data": {
        "id": 8496508,
        "northstar_id": "551234567890abcdefghijkl",
        "campaign_id": "3455",
        "campaign_run_id": 6498,
        "quantity": 72,
        "why_participated": null,
        "source": "sample-oauth",
        "details": null,
        "created_at": "2018-01-29T19:37:33+00:00",
        "updated_at": "2018-01-30T16:40:37+00:00"
      }
    }
  }
}
```

{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% hint style="info" %}
The request is proxied to Rogue and automatically adds the `filter[campaign_id]=:id` to the query params.

Please refer to the [Rogue API Documentation](https://github.com/DoSomething/rogue/blob/master/documentation/endpoints/v3/posts.md#create-a-post) for further information.
{% endhint %}
