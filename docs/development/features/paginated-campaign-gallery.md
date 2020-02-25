# Paginated Campaign Gallery

The `PaginatedCampaignGallery` component will display a paginated gallery of 'website' campaigns queried via GraphQL.

## Usage Instructions

The `PaginatedCampaignGallery` accepts a list of variables used to optionally filter and sort the campaigns:

- An array of `causes` Strings to filter for campaigns including the listed causes
- an `isOpen` Boolean to determine filtering for open or closed campaigns
- an `orderBy` (comma separated) String to program the sorting (`'id,desc'`)
- a `first` integer to determine how many campaigns to pull at a time

Additionally, it accepts a couple of gallery specific props:

- `itemsPerRow`
- _(optional)_ `title`

```jsx
<PaginatedCampaignGallery
  className="grid-full"
  itemsPerRow={4}
  title="Campaigns"
  variables={{ isOpen: true, first: 12, causes: [slug] }}
/>
```

![Example paginated campaign gallery](../../.gitbook/assets/paginated-campaign-gallery.jpg)
