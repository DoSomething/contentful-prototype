import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';
import { AdminDashboardContainer, CampaignDashboardContainer } from '../AdminDashboard';

const Campaign = props => (
  <div>
    <AdminDashboardContainer>
      <CampaignDashboardContainer />
    </AdminDashboardContainer>

    <NotificationContainer />
    <ModalSwitch />

    { props.shouldShowLandingPage ?
      <LandingPageContainer {...props} />
      :
      <CampaignPageContainer {...props} />}
  </div>
);

Campaign.propTypes = {
  shouldShowLandingPage: PropTypes.bool.isRequired,
};

export default Campaign;
