# Campaigns (v1)

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
