import React from 'react';

import { PHOENIX_URL } from '../../../../constants';
import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';
import SocialDriveActionContainer from '../../../actions/SocialDriveAction/SocialDriveActionContainer';

/*
// @TODO: 
const shareAction = (
  <SocialDriveActionContainer
    link={betaUrl}
    fullWidth
  />
);
*/

const AlphaPage = () => {
  const betaUrl = 'https://vote.dosomething.org';

  return (
    <React.Fragment>
      <ContentBlock
        title="Get 3 friends to register!"
        content="You have registered **1 person** so far."
        className="grid-wide"
      />
      <ContentBlock
        title="How to share"
        content="Use the sharing tools below to track how many people you register to vote! To enter the scholarship, you must upload a screenshot of each share.  Each upload counts as a scholarship entry - the more you share, the more your chances of winning! Check out the Official Scholarship Rules for more information."
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

export default AlphaPage;
