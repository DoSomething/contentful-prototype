import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';

const CampaignClosedPage = props => {
  const { endDate } = props;

  return (
    <div>
      <LedeBannerContainer />

      <div className="main clearfix">
        <Enclosure className="md:w-3/4 mx-auto my-6 px-3">
          <h1>Great work!</h1>
          <p>
            This campaign closed on{' '}
            {format(endDate, 'MMMM do, yyyy', {
              awareOfUnicodeTokens: true,
            })}
            . Thank you to all the members who participated and the incredible
            impact you made!
          </p>
        </Enclosure>
      </div>

      <CampaignInfoBarContainer />
    </div>
  );
};

CampaignClosedPage.propTypes = {
  endDate: PropTypes.string.isRequired,
};

export default CampaignClosedPage;
