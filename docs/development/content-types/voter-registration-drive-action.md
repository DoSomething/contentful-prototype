# Voter Registration Drive Action

This block type displays a shortened link to the current user's Online Voter Registration Drive (OVRD) Page.

![Voter Registration Drive Action](../../.gitbook/assets/voter-registration-drive-action.png)

The user is asked to optionally choose causes to urge their friends to vote about, which appends a `voting-reasons` query parameter to the OVRD Page URL. These choices are not persisted: the next time the user visits a `VoterRegistrationDriveAction` block, they will need to reselect their causes.

## Fields

-   **Internal Title**

-   **Title**: The card title, e.g. "Share with your friends"

-   **Description**: Paragraph below the card title, e.g. "Urge your friend to vote...."
