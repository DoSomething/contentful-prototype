import React from 'react';
import PropTypes from 'prop-types';

import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';
import { getHumanFriendlyDate } from '../../../helpers';

const CampaignClosedPage = props => {
  const { endDate } = props;

  return (
    <>
      <article className="campaign-closed-page pb-6">
        <LedeBannerContainer isClosed />

        <div className="md:w-3/4 mx-auto my-6 px-3">
          <h1>Great work!</h1>
          <p>
            This campaign closed on {getHumanFriendlyDate(endDate)}. Thank you
            to all the members who participated and the incredible impact you
            made!
          </p>
        </div>
      </article>

      <CampaignInfoBarContainer />
    </>
  );
};

CampaignClosedPage.propTypes = {
  endDate: PropTypes.string.isRequired,
};

export default CampaignClosedPage;
