# Landing Page

## Overview

The landing page displayed on a [campaign](development/content-types/campaign.md) when the current user is not signed up.

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the entry shows up in search results, etc.

- **Content** : A Rich Text field, which can embed `contentBlock`, `imagesBlock`, and `linkAction` entries.

- **Title** : This isn't used and should be deleted?

- **Subtitle** : This too?

- **Sidebar** : A multi-value reference field, only displayed on the legacy campaign template.

- **Additonal Content** : The legacy campaign template uses this field to display Landing Page content, expecting a `legacyTemplateContent` property.
