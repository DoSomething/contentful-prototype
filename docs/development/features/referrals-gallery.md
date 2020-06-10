# Referrals Gallery

## Overview

The `ReferralsGallery` utility component displays a - truncated but expandable - gallery of labeled icons pertaining to the current user's referrals.

In our business logic, this means fetching a list of either posts or signups where the `referrer_user_id` matches the current user, parsing out the referred users' **Display name** values, and passing that list as the `referralLabels` prop to the Referrals Gallery.

The gallery will render the referral labels under images utilizing the `referralIcon` prop in a list truncated to the first three referral labels. It will also display a link showing the additional count of referrals ('+ n more') which, when clicked, will expand the gallery to display the full list, with the link converting to a 'view less' link which will collapse the gallery when clicked.

![Referrals Gallery Truncated](../../.gitbook/assets/referrals-gallery-truncated.png)

![Referrals Gallery Expanded](../../.gitbook/assets/referrals-gallery-expanded.png)

If less then three referral labels are passed to the gallery, it will auto append placeholder labels to achieve a minimum of three gallery nodes, under a list of the assigned `placeholderIcon` icon. (With _no_ additional count link, of course).

![Referrals Gallery With One Referral](../../.gitbook/assets/referrals-gallery-with-one-referral.png)

## Usage Instructions

```js
import ReferralIcon from './referral-icon.svg';
import PlaceholderIcon from './placeholder-icon.svg';

const signupReferrals = [
  { id: 1, user: { displayName: 'Michael M.' } },
  { id: 2, user: { displayName: 'Amanda W.' } },
  { id: 3, user: { displayName: 'Billy C.' } },
  { id: 4, user: { displayName: 'Jane M.' } },
  { id: 5, user: { displayName: 'Matt F.' } },
];

<ReferralsGallery
  referralLabels={signupReferrals.map(referral => referral.user.displayName)}
  referralIcon={ReferralIcon}
  placeholderIcon={PlaceholderIcon}
/>;
```
