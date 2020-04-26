import React from 'react';
import PropTypes from 'prop-types';

import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

const AlphaPage = ({ userId }) => {
  const betaUrl = `https://vote.dosomething.org/member-drive?userId=${userId}&r=user:${userId},source:web,source_details:onlinedrivereferral,referral=true`;

  // TODO: Query GraphQL for voter registration referrals, render dynamic count.
  return (
    <React.Fragment>
      <ContentBlock
        title="Get 3 friends to register!"
        content="You have registered **1 person** so far."
        className="grid-wide"
      />
      {/* @TODO: Add images and referral user names*/}
      <ContentBlock
        title="How to share"
        content="Use the sharing tools below to track how many people you register to vote! To enter the scholarship, you must [upload a screenshot of each share](/us/campaigns/online-registration-drive/submit-photo). Each upload counts as a scholarship entry - the more you share, the more your chances of winning! Check out the [Official Scholarship Rules](/us/campaigns/online-registration-drive/submit-photo) for more information."
        className="grid-wide"
      />
      <SocialDriveActionContainer
        link={betaUrl}
        fullWidth
        className="grid-wide"
      />
      <ContentBlock
        title="FAQs"
        content="What are some tips for sharing?"
        className="grid-wide"
      />
    </React.Fragment>
  );
};

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
