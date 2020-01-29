# Page

## Overview

The Page Content Type is used across the app in several forms:

1. As a [Campaign](./campaign.md) subpage. If the `slug` is prefixed with the campaign's `slug` (e.g. `teens-for-jeans/action`), and the page is referenced within the campaign's `pages`. It'll be accessible via the Campaign's URL + `/:slug` e.g. `/us/campaigns/teens-for-jeans/action`.
2. As a standalone article page. If the `slug` is prefixed with `articles/` (e.g. `articles/how-to-volunteer`), it'll be rendered in the general page template.
3. As a standalone '11-facts-page'. If the `slug` is prefixed with `facts/` (e.g. `facts/11-facts-about-dogs`), it'll be rendered in the general page template.

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the block shows up in search results, etc.

- **Title** _(optional)_: The title is displayed prominantly on the page, for articles/facts pages. For campaign subpages, it'll display as the sub navigation link on the campaign (unless the `hideFromNavigation` field is toggled off).

- **Subtitle** _(optional)_: The subtitle is displayed beneath the title, _only_ for articles/facts pages.

- **Slug**: The slug used to access the pages. (must be prefixed with the parent Campaign slug for campaign subpages, `articles/` for article pages, `facts/` for facts pages). (`about/` is a prohibited prefix, since about pages render via the [Company Page](./company-page))

- **Metadata** _(optional)_: A reference to the [Metadata](./metadata) for this page (_only_ for articles/facts pages. Campaign subpages use the Campaign's metadata).

- **Authors** _(optional)_: A list of references to the authors (Person entries) of this page. (_only_ for articles/facts pages). Displays beneath the subtitle, as well as an author bio at the bottom of the page.

- **Cover Image** _(optional)_: The cover image for this page (_only_ for article/facts pages).

- **Content**: The markdown content for this page.

- **Sidebar** _(optional)_: A list of Call To Action or Custom Block references displayed as a sidebar on the page.

- **Blocks** _(optional)_: A list of blocks displayed on the page beneath the **Content**. (Supports most standalone block widgets in our Contentful arsenal).

- **Display Social Share** _(optional)_: Toggles social share buttons (Facebook, Twitter) beneath the page. (_only_ for articles/facts pages).

- **Hide From Navigation** _(optional)_: Toggles whether a Campaign subpage (linked within the parent Campaign's **Pages**) will be displayed in the Campaign sub navigation bar. If toggled off, the page will _still_ be accessible.

- **Additional Content**: _(optional)_: Any custom settings for this page in JSON format:
  - `display_scholarship_newsletter_cta_popover: true/false`. Toggles the Call To Action popover for scholarships newsletter registration on articles/facts pages.
