# Current School Block

## Overview

Displays the authenticated user's current school (and optional school impact), or displays a school finder form to update their school.

If the user does not have a `school_id` set on their Northstar profile, they are prompted to select their school's state, and then prompted to select their school from an autocomplete dropdown of schools in the selected state. This list of schools is sourced from [Great Schools](https://www.greatschools.org/). Upon save, the user's Northstar `school_id` field is updated with the selected school.

## Content Type Fields

- **Internal Title**: This is for our internal Contentful organization and will be how the block shows up in search results, etc.

- **Action ID** _(optional)_: The ID of the [Action](https://github.com/DoSomething/rogue/blob/master/docs/endpoints/actions.md) to show the selected school's aggregate quantity for.

- **Select School Title** _(optional)_: The Card title when school finder form is shown (Defaults to "Find Your School").

- **Select School Description** _(optional)_: The text displayed above the school finder form.

- **Current School Title** _(optional)_: The Card title when the user has a current school (Defaults to "Your School").

- **Current School Description** _(optional)_: The text displayed above the user's current school information.

- **School Not Available Description** _(optional)_: The text displayed when the user has selected that they can't find their school (when `school_id` is `school-not-available`).

## Current Limitations

- Only K-12 schools are listed -- colleges currently unavailable.

  - Colleges are not included in our Great Schools data set. We may want to add colleges to our Schools database, and store our own internal ID for schools instead of the Great Schools`universal-id` we're currently saving to a user `school_id`.

- A user is currently unable to edit their school once it is set.

  - This is mainly to avoid the complexity around whether we'd need to update any posts the user has submitted in association with their previous `school_id` value.

## Links

- [Editorial instructions](https://docs.google.com/document/d/1_sYkIseRBCUm3TmMvyB7iMAbMj4IOOTOz961rdl_2XY/edit#)

- [Technical Spec](https://docs.google.com/document/d/1c11vXT-nu5TGR4B8LyPPApQDYiTUcjgRMKaSP9nQ20M/edit?usp=sharing)
