import React from 'react';
import PropTypes from 'prop-types';

import { ModalSwitchContainer, SURVEY_MODAL, VOTER_REGISTRATION_MODAL } from '../Modal';
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

    { props.featureFlags && props.featureFlags.showVoterRegistrationModal ? (
      <TrafficDistribution percentage={10} feature="voter_reg_modal">
        <ModalLauncherContainer
          type="voter_reg_modal"
          countdown={30}
          modalType={VOTER_REGISTRATION_MODAL}
        />
      </TrafficDistribution>
    ) : null }

    { props.shouldShowLandingPage ?
      <LandingPageContainer {...props} />
      :
      <CampaignPageContainer {...props} />}
  </div>
);

Campaign.propTypes = {
  shouldShowLandingPage: PropTypes.bool.isRequired,
  featureFlags: PropTypes.objectOf(PropTypes.bool),
};

Campaign.defaultProps = {
  featureFlags: null,
};

export default Campaign;
