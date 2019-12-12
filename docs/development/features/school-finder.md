# School Finder

## Overview

The `SchoolFinder` component provides an interface for an authenticated user to view or select their current school, updating their Northstar profile's `school_id` field upon submit. It also displays their school's impact for the [action](https://github.com/DoSomething/rogue/blob/master/docs/endpoints/actions.md) set via the `action_id` property of the `SchoolFinder`.

The user is prompted to select their school's state, and then is presented with an autocomplete dropdown of schools in the selected state. This list of schools is sourced from [Great Schools](https://www.greatschools.org/).

## Usage Instructions

A `SchoolFinder` can be displayed within a `ContentBlock` entry, by setting the following properties in the `additionalContent` JSON field:

- `showSchoolFinder` - If set to `true`, display a `SchoolFinder` below the `ContentBlock`

- `actionId` - The action to display the user school's aggregate quantity for

- `schoolFinderFormDescription` - Description displayed above the school state/name select form. This property is optional, default value is `null`.

- `schoolNotAvailableHeadline` - Headline displayed when user cannot find their school via dropdown. This property is optional, default value is "No School Selected".

- `schoolNotAvailableDescription` - Description displayed when user cannot find their school via dropdown. This property is optional, default value is `null`.

- `schoolSelectedConfirmation` - Description displayed when user has selected a school. This property is optional, default value is `null`.

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

- A user is currently unable to edit their school once it is set.

- Colleges are currently not available to be selected via School Finder, only K-12 schools are listed.

## Links

- [Editorial instructions](https://docs.google.com/document/d/1_sYkIseRBCUm3TmMvyB7iMAbMj4IOOTOz961rdl_2XY/edit#)

- [Technical Spec](https://docs.google.com/document/d/1c11vXT-nu5TGR4B8LyPPApQDYiTUcjgRMKaSP9nQ20M/edit?usp=sharing)
