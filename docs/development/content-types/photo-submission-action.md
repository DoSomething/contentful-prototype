# Photo Submission Action

## Overview

The Photo Submission Action allows users to submit a photo RB post.

<!-- ![Example Photo Submission Action](../../.gitbook/assets/...) -->

Once the user submits the form successfully, they will be redirected to the Show Submission Page.

## Content Type Fields

-   **Internal Title**: This is for our internal Contentful organization and will be how the block shows up in search results, etc.
-   **Action ID**: The Action ID associated with this action in Rogue.
    <!-- ... -->

## Hours Spent Field

If the `DS_ENABLE_HOURS_REPORTBACK_FIELD` is set to `true`, and the associated Rogue Action for this Photo Submission Action (queried using the assign **Action ID** field) qualifies for Volunteer Credit, we display the Hours Spent input field, allowing the user to submit the time they've spent on this action.

![Example Photo Submission Action With Hours Spent Field](../../.gitbook/assets/photo-submission-action-hours-spent.png)
