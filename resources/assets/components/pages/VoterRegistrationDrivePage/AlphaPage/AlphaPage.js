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
    </React.Fragment>
  );
};

export default AlphaPage;
