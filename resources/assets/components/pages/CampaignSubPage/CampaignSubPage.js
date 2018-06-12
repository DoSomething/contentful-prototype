import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import { CallToActionContainer } from '../../CallToAction';
import CampaignSubPageContent from './CampaignSubPageContent';
import DashboardContainer from '../../Dashboard/DashboardContainer';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignPageNavigationContainer from '../../CampaignPageNavigation/CampaignPageNavigationContainer';

import './campaign-subpage.scss';

/**
 * Render the page & chrome.
 *
 * @returns {XML}
 */
const CampaignSubPage = props => (
  <div>
    <LedeBannerContainer />
    <div className="main clearfix">
      {props.dashboard ? <DashboardContainer /> : null}
      <CampaignPageNavigationContainer />
      <Enclosure className="default-container margin-top-lg margin-bottom-lg">
        <CampaignSubPageContent {...props} />
      </Enclosure>
      <CallToActionContainer sticky hideIfSignedUp />
    </div>
  </div>
);

CampaignSubPage.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
};

CampaignSubPage.defaultProps = {
  dashboard: null,
};

export default CampaignSubPage;
