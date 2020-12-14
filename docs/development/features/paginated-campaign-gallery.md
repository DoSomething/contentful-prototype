# Paginated Campaign Gallery

The `PaginatedCampaignGallery` component will display a paginated gallery of 'website' campaigns queried via GraphQL.

## Hide Campaigns

Group Campaigns (Campaigns with a `group_type_id` field assigned), will not be displayed in the gallery. Additionally, a custom list of Campaign IDs can be assigned via the `DS_HIDE_CAMPAIGN_IDS` site config variable, and Campaigns with matching IDs will also be rejected.

## Algolia Campaigns Search

If the `DS_ENABLE_ALGOLIA_CAMPAIGNS_SEARCH` feature flag is enabled, the gallery will utilize the `searchCampaigns` GraphQL query to fetch the campaigns via Algolia.

## Usage Instructions

The `PaginatedCampaignGallery` accepts a list of variables used to optionally filter and sort the campaigns:

-   An array of `causes` Strings to filter for campaigns including the listed causes
-   an `isOpen` Boolean to determine filtering for open or closed campaigns
-   an `orderBy` (comma separated) String to program the sorting (`'id,desc'`)
-   a `first` integer to determine how many campaigns to pull at a time

Additionally, it accepts a couple of gallery specific props:

-   `itemsPerRow`
-   _(optional)_ `title`

```jsx
<PaginatedCampaignGallery
    className="grid-full"
    itemsPerRow={4}
    title="Campaigns"
    variables={{ isOpen: true, first: 12, causes: [slug] }}
/>
```

![Example paginated campaign gallery](../../.gitbook/assets/paginated-campaign-gallery.jpg)
