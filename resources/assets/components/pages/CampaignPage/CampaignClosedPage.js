import React from 'react';
import PropTypes from 'prop-types';

import { getHumanFriendlyDate } from '../../../helpers/datetime';
import PageInfoBarContainer from '../../PageInfoBar/PageInfoBarContainer';
import CampaignBannerContainer from '../../CampaignBanner/CampaignBannerContainer';

const CampaignClosedPage = props => {
  const { endDate } = props;

  return (
    <>
      <article className="campaign-closed-page pb-6">
        <CampaignBannerContainer />

        <div className="md:w-3/4 mx-auto my-6 px-3">
          <h1>Great work!</h1>
          <p>
            This campaign closed on {getHumanFriendlyDate(endDate)}. Thank you
            to all the members who participated and the incredible impact you
            made!
          </p>
        </div>
      </article>

      <PageInfoBarContainer />
    </>
  );
};

CampaignClosedPage.propTypes = {
  endDate: PropTypes.string.isRequired,
};

export default CampaignClosedPage;
