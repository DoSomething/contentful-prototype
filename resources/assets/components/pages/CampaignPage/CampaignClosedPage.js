import React from 'react';

import Enclosure from '../../Enclosure';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';

const CampaignClosedPage = props => {
  return (
    <div>
      <LedeBannerContainer />
      <div className="main clearfix">
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <h1>No campaign for you!</h1>
          <p>This campaign has already closed. Try again later.</p>
        </Enclosure>
      </div>
    </div>
  );
};

export default CampaignClosedPage;
