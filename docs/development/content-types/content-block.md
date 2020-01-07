# Content Block

## Overview

Displays headline, subtitle, supertitle, copy, and image. Commonly used to list steps in a campaign.

![Example Content Block](../../.gitbook/assets/content-block-example.png)

## Technical Notes

- Available as a `ContentBlock` in GraphQL.

- For now, the `additionalContent` field is used to display a Current School Block below a Section Block. This will be deprecated in the near future, but the expected values are:

```
{
    "showSchoolFinder": true,
    "actionId": 21,
    "schoolFinderFormDescription": "Pick your school and whatever. Invite your classmates to join this campaign and donate their jeans to win prizes and some other stuff.",
    "schoolNotAvailableHeadline": "No School Selected",
    "schoolNotAvailableDescription": "No school copy goes here, please email Sahara with information about your school.",
    "schoolSelectedConfirmation": "Your school total will be updated anytime a submission from someone in your school has been reviewed."
}
```
