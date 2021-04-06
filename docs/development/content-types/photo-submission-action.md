# Photo Submission Action

## Overview

The Photo Submission Action allows users to submit a photo RB post.

<!-- ![Example Photo Submission Action](../../.gitbook/assets/...) -->

Once the user submits the form successfully, they will be redirected to the Show Submission Page.

## Content Type Fields

-   **Internal Title**: This is for our internal Contentful organization and will be how the block shows up in search results, etc.
-   **Action ID**: The Action ID associated with this action in Northstar.
    <!-- ... -->

## Hours Spent Field

If the associated Northstar Action for this Photo Submission Action (queried using the assign **Action ID** field) qualifies for Volunteer Credit, we display the Hours Spent input field, allowing the user to submit the time they've spent on this action.

![Example Photo Submission Action With Hours Spent Field](../../.gitbook/assets/photo-submission-action-hours-spent.png)

## Custom File Dimension Validation

The `file` field (which we use to POST the uploaded photo to our Activity API) has strict dimension validations. To ensure clarity for our users, we display a customized validation message for this specific field containing a link to our Help Center:

![Example Photo Submission Action Dimension Errors](../../.gitbook/assets/photo-submission-action-dimension-errors.png)
