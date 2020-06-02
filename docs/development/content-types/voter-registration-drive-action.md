# Voter Registration Drive Action

This block type will display a `SocialDriveAction` that links to the current user's Online Voter Registration Drive (OVRD) Page.

![Voter Registration Drive Action](../../.gitbook/assets/voter-registration-drive-action.png)

The user is asked to optionally choose causes to urge their friends to vote about, which appends a `voting-reasons` query parameter to the OVRD Page URL. These choices are not persisted: the next time the user visits a `VoterRegistrationDriveAction` block, they will need to reselect their causes.

## Fields

- **Internal Title**

- **Title**: The card title, e.g. "Share with your friends"

- **Description**: Paragraph below the card title, e.g. "Urge your friend to vote...."

- **Approved Post Count Action ID**: If set, the count of current user's approved posts for this action will appear in the "More info" sidebar. This is commonly set to the photo action that asks user to upload a screenshot of them sharing their OVRD link.

- **Approved Post Count Label** : Label text for the approved post count action, if set. Defaults to "Total scholarship entries" if blank.
