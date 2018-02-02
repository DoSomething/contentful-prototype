import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import SurveyContainer from '../Survey';
import NotificationContainer from '../Notification';
import TrafficDistribution from '../TrafficDistribution';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import { AdminDashboardContainer, CampaignDashboardContainer } from '../AdminDashboard';

const Campaign = props => (
  <div>
    <AdminDashboardContainer>
      <CampaignDashboardContainer />
    </AdminDashboardContainer>

    <NotificationContainer />
    <ModalSwitch />

    <TrafficDistribution percentage={5} feature="nps_survey">
      <SurveyContainer />
    </TrafficDistribution>

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
