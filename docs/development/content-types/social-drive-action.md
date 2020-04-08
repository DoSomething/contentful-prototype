# Social Drive Action

## Overview

Displays a shortened link for the user to share.

![Example Social Drive Action](../../.gitbook/assets/social-action-drive.png)

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the entry shows up in search results, etc.

- **Link** : The full URL that the user should share. This link will be shortened via API request to [`POST /v2/links`](api-reference/api-v2/links-resource.md) when rendered in the browser.

- **Hide Page Views** : If this boolean field is set to true, a Voter Registration Drive section will be rendered, displaying the number of Bertly page views the link has, as well as a count of the authenticated user's completed voter registration referrals (derived from a GraphQL `getPostsCount` query).

![Example Voter Registration Drive](../../.gitbook/assets/voter-registration-drive.png)
