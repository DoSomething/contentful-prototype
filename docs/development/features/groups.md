# Groups

If a Rogue campaign is configured with a group type, a Group Finder will appear on the campaign landing page. Members must select a group to join in order to signup for the campaign (which will save their selected group ID to their signup).

![Example Group Finder](../../.gitbook/assets/groups-landing-page.png)

## Group types

Current list of group types:

- [March For Our Lives](https://activity.dosomething.org/group-types/1)
- [National Association of Secondary School Principals (NASSP)](https://activity.dosomething.org/group-types/5)
- [National Honor Society](https://activity.dosomething.org/group-types/2) - a subset of NASSP groups
- [National Junior Honor Society](https://activity.dosomething.org/group-types/3) - a subset of NASSP groups
- [National Student Council](https://activity.dosomething.org/group-types/4) - a subset of NASSP groups

If a group type's `filter_by_state` boolean attribute is `true`, the Group Finder will require the member to select their group state first before searching for the group name.

![Filter by state example](../../.gitbook/assets/groups-filter-by-state.png)

## Online Voter Registration Drives

These group types will be running [Online Voter Registration Drive (OVRD)](development/features/voter-registration.md#online-drives) campaigns. A [VoterRegistrationDriveAction](development/content-types/voter-registration-drive-action.md) used on an action page of a groups campaign will append the alpha's selected `group_id` as a query parameter to their OVRD page, e.g:

> /us/my-voter-registration-drive?group_id=172&referrer_user_id=5547be89469c64ec7d8b518d

When betas register to vote via an alpha's link that contains a `group_id`, our [importer app](development/features/voter-registration.md#import) will populate the voter-reg post with the alpha's `group_id` as well as the alpha's `referrer_user_id`. This allows us to count the total number of people each group has gotten to register to vote.
