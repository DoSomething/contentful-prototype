# Voter Registration Marketing Page

## Overview

Voter Registration landing page for influencers and marketing partners.

The pages styling can be be customized per brand. Each page displays a [Start Voter Registration Form](../features/voter-registration.md#start-voter-registration-form).

📸 [Example voter-registration-marketing-page](../../.gitbook/assets/voter-registration-marketing-page.png).

## Content Type Fields

-   **Internal Title**: This is for our internal Contentful organization and will be how the block shows up in search results, etc. (does _not_ display to the user on the page).

-   **Slug**: The URL slug, which we prefix with `/vote/`. e.g. `dosomething.org/vote/niche`.

-   **Cover Image**: Displays atop the banner at the top of the page.

-   **Metadata** _(optional)_: A reference to the [Metadata](./metadata.md) for this page.

-   **Banner Background Color** _(optional)_: The background color for the page banner. Must be a valid 6 digit hexidecimal value preceded by a '#'.

-   **Logo** _(optional)_: The logo to be displayed in the banner atop the title.

-   **Title**: This is the title of the page. e.g. "Niche wants you to vote".

-   **Title Color** _(optional)_: The font color for the title. Must be a valid 6 digit hexidecimal value preceded by a '#'.

-   **Subtitle**: This is the subtitle of the page. e.g. "Register to vote online in 15 minutes".

-   **Subtitle Color** _(optional)_: The font color for the subtitle. Must be a valid 6 digit hexidecimal value preceded by a '#'.

-   **Voter Registration Form Button Text** _(optional)_: Customize the submission button text in the voter registration form.

-   **Voter Registration Form Button Color** _(optional)_: Customize the submission button color in the voter registration form. Must be a valid 6 digit hexidecimal value preceded by a '#'.

-   **Source** _(source)_: Customize the `source` value embedded within the [RTV redirect URL](../features/voter-registration.md#tracking-source) once the voter registration form is submitted. (Defaults to 'web').

-   **Source Details** _(source)_: Customize the `source_details` value embedded within the [RTV redirect URL](../features/voter-registration.md#tracking-source) once the voter registration form is submitted. (Defaults to 'voter_registration_marketing_page').

-   **Content**: A reference to a Section Block for customizable page content.

## Technical Notes

#### GraphQL

The Cause Page is available as a `VoterRegistrationMarketingPage` in GraphQL.
