# School Finder

## Overview

The `SchoolFinder` component provides an interface for an authenticated user to view or select their current school, updating their Northstar profile's `school_id` field upon submit.

If they don't have a school set, the user is prompted to select their school's state, and then is presented with an autocomplete dropdown of schools in the selected state. This list of schools is sourced from [Great Schools](https://www.greatschools.org/).

Upon selecting a school, if the `SchoolFinder` is configured with an `actionId`, the selected school's aggregate approved quantity for the action will display next to the school information.

## Usage

A `SchoolFinder` can be displayed within a [`ContentBlock`](development/content-types/content-block.md) entry, by setting the following properties in the `additionalContent` JSON field:

- `showSchoolFinder` - If set to `true`, display a `SchoolFinder` below the `ContentBlock`

- `actionId` - If set, display the selected school's aggregate quantity for given [action](https://github.com/DoSomething/rogue/blob/master/docs/endpoints/actions.md). This property is optional, if not set - school impact is not displayed.

- `schoolFinderFormDescription` - Optional. Description displayed above the school state/name select form. This property is optional, default value is `null`.

- `schoolNotAvailableHeadline` - Headline displayed when user cannot find their school via dropdown. This property is optional, default value is "No School Selected".

- `schoolNotAvailableDescription` - Description displayed when user cannot find their school via dropdown. This property is optional, default value is `null`.

- `schoolSelectedConfirmation` - Description displayed when user has selected a school. This property is optional, default value is `null`.

**Note** - This would be better implemented as a separate content type with fields instead hijacking the `additionalContent` JSON field of our `ContentBlock` content type. We may refactor if the feature will be used by multiple campaigns (was built for Teens For Jeans 2019).

### Example

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

## Current Limitations

- Colleges are currently not available to be selected via School Finder, only K-12 schools are listed.

  - Colleges are not included in our Great Schools data set. We may want to add colleges to our Schools database, and store our own internal ID for schools instead of the Great Schools`universal-id` we're currently saving to a user `school_id`.

- A user is currently unable to edit their school once it is set.

  - This is mainly to avoid the complexity around whether we'd need to update any posts the user has submitted in association with their previous `school_id` value.

## Links

- [Editorial instructions](https://docs.google.com/document/d/1_sYkIseRBCUm3TmMvyB7iMAbMj4IOOTOz961rdl_2XY/edit#)

- [Technical Spec](https://docs.google.com/document/d/1c11vXT-nu5TGR4B8LyPPApQDYiTUcjgRMKaSP9nQ20M/edit?usp=sharing)
