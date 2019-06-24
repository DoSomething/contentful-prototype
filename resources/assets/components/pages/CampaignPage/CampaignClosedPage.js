import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';

const CampaignClosedPage = props => {
  return (
    <div>
      <LedeBannerContainer displaySignup={false} />

      <div className="main clearfix">
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <h1>Great work!</h1>
          <p>
            This campaign closed on{' '}
            {format(props.endDate, 'MMMM do, yyyy', {
              awareOfUnicodeTokens: true,
            })}
            . Thank you to all the members who participated and the incredible
            impact you made!
          </p>
        </Enclosure>
      </div>
    </div>
  );
};

CampaignClosedPage.propTypes = {
  endDate: PropTypes.string.isRequired,
};

export default CampaignClosedPage;
