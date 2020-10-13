# Metadata

Scholarship Gallery

## Overview

The Gallery Block Signup allows authenticated users to signup directly for a campaign by clicking the gallery block signup button and being directed to the campaign action page

! [Example Scholarship Gallery Button](../../.gitbook/assets/scholarship-gallery-signup-example.png)

Once the signup button is clicked by a user who is logged in, the `CREATE_SIGNUP-MUTATION` is triggered and will create a signup associated with the [`campaignId`] captured on the `ScholarshipCard` and redirect the user to the campaign action page

! [Example Campaign Action Page Authenticated](../../.gitbook/assets/gallery-signup-campaign-action-page-example.png)

The `GalleryBlockSignup` renders for authenticated users only. If the user is unauthenticated, the `SecondayButton` will be triggered by default in which they will be directed to the campaign landing page.

If the user is unauthenticated, the user will be required to register as a member before signing up for the campaign.

! [Example Campaign Action Page Unauthenticated](../../.gitbook/assets/gallery-signup-campaign-action-page-unauthenticated-example.png)

## Content Type Fields

**Campaign ID**: The Id of the campaign to create signups for

## Under The Hood

**Authentication**: The user's [authentication](https://github.com/DoSomething/phoenix-next/blob/10cf490254ca1dfa99772cbf81918d2ab7800f6c/resources/assets/components/utilities/ScholarshipCard/ScholarshipCard.js#L121) is checked before the gallery block signup component is triggered
**Validation**: Rogue will only create a new signup if necessary, this prevents duplicate signups from a user
