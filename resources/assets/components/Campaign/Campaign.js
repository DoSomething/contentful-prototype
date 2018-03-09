import React from 'react';
import PropTypes from 'prop-types';

import { ModalSwitchContainer, SURVEY_MODAL } from '../Modal';
import NotificationContainer from '../Notification';
import TrafficDistribution from '../TrafficDistribution';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import { AdminDashboardContainer, CampaignDashboardContainer } from '../AdminDashboard';
import ModalLauncherContainer from '../ModalLauncher';

const Campaign = props => (
  <div>
    <AdminDashboardContainer>
      <CampaignDashboardContainer />
    </AdminDashboardContainer>

    <NotificationContainer />
    <ModalSwitchContainer />

    <TrafficDistribution percentage={5} feature="nps_survey">
      <ModalLauncherContainer
        type="nps_survey"
        countdown={60}
        modalType={SURVEY_MODAL}
      />
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
