# Landing Page

## Overview

The landing page displayed on a [campaign](development/content-types/campaign.md) when the current user is not signed up.

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the entry shows up in search results, etc.

- **Content** : A Rich Text field, which can embed `contentBlock`, `imagesBlock`, and `linkAction` entries.

- **Additional Content** : The legacy campaign template uses this field to display Landing Page content, expecting a `legacyTemplateContent` property.
