# Campaigns (v1)

## Retrieve a Campaign
```
GET /api/v1/campaigns/{id}
```

The `id` can be either a Contentful ID or an Ashes Legacy ID.

Example Request:

```
https://next.dosomething.org/api/v1/campaigns/6LQzMvDNQcYQYwso8qSkQ8
```

Example Response:

```
{
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
        "url": "https://images.contentful.com/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg",
        "landscapeUrl": "https://images.contentful.com/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?w=1440&h=620&fm=jpg&fit=fill"
    },
    "campaignLead": {
        "id": "4V3gy8KPBK4gAWuMGSKWuA",
        "type": "staff",
        "fields": {
            "name": "Adam Garner",
            "jobTitle": "Campaign Lead",
            "avatar": "https://images.contentful.com/81iqaqpfd8fy/5dN0SxEQrYeI8eKwOAOwia/179e972eae699c6377faa74d611a50a2/Adam_Garner_Headshot.png?w=600&h=600&fm=jpg&fit=fill",
            "email": "adam@dosomething.org"
        }
    },
    "affiliateSponsors": [],
    "affiliatePartners": [],
    "activityFeed": [],
    "actionSteps": [],
    "quizzes": [],
    "dashboard": null,
    "affirmation": null,
    "pages": [],
    "landingPage": null,
    "socialOverride": null,
    "additionalContent": null,
    "allowExperiments": true,
    "actionText": "Join Us"
}
```


## Retrieve All Posts for a Campaign
```
GET /api/v1/campaigns/{id}/posts
```

The request is proxied to Rogue and automatically adds the `filter[campaign_id]=:$id` to the query params.

// @TODO add link to corresponding url params and response example from Rogue


## Create a Post for a Campaign
```
POST /api/v1/campaigns/{id}/posts
```

The request is proxied to Rogue and automatically adds the `filter[campaign_id]=:$id` to the query params.

// @TODO add link to corresponding body params and response example from Rogue
