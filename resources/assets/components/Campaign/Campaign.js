import React from 'react';
import PropTypes from 'prop-types';

import {
  ModalSwitchContainer,
  SURVEY_MODAL,
  VOTER_REGISTRATION_MODAL,
} from '../Modal';
import NotificationContainer from '../Notification';
import TrafficDistribution from '../utilities/TrafficDistribution/TrafficDistribution';
import ModalLayer from '../utilities/ModalLayer/ModalLayer';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import {
  AdminDashboardContainer,
  CampaignDashboardContainer,
} from '../AdminDashboard';
import ModalLauncherContainer from '../ModalLauncher';

const Campaign = props => (
  <ModalLayer
    history={props.history}
    location={props.location}
    match={props.match}
  >
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

    {props.featureFlags && props.featureFlags.showVoterRegistrationModal ? (
      <TrafficDistribution percentage={50} feature="voter_reg_modal">
        <ModalLauncherContainer
          type="voter_reg_modal"
          countdown={30}
          modalType={VOTER_REGISTRATION_MODAL}
        />
      </TrafficDistribution>
    ) : null}

    {props.shouldShowLandingPage ? (
      <LandingPageContainer {...props} />
    ) : (
      <CampaignPageContainer {...props} />
    )}
  </ModalLayer>
);

Campaign.propTypes = {
  shouldShowLandingPage: PropTypes.bool.isRequired,
  featureFlags: PropTypes.objectOf(PropTypes.bool),
  location: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

Campaign.defaultProps = {
  featureFlags: null,
};

export default Campaign;
