import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  ModalSwitchContainer,
  SurveyModalContainer,
  VoterRegistrationModalContainer,
} from '../Modal';
import NotificationContainer from '../Notification';
import TrafficDistribution from '../utilities/TrafficDistribution/TrafficDistribution';
import ModalRoute from '../utilities/ModalRoute/ModalRoute';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import {
  AdminDashboardContainer,
  CampaignDashboardContainer,
} from '../AdminDashboard';
import ModalLauncherContainer from '../ModalLauncher';

const Campaign = props => (
  <ModalRoute
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
        render={() => <SurveyModalContainer />}
      />
    </TrafficDistribution>

    {props.featureFlags && props.featureFlags.showVoterRegistrationModal ? (
      <TrafficDistribution percentage={50} feature="voter_reg_modal">
        <ModalLauncherContainer
          type="voter_reg_modal"
          countdown={30}
          render={() => <VoterRegistrationModalContainer />}
        />
      </TrafficDistribution>
    ) : null}

    {props.shouldShowLandingPage ? (
      <LandingPageContainer {...props} />
    ) : (
      <CampaignPageContainer {...props} />
    )}
  </ModalRoute>
);

Campaign.propTypes = {
  shouldShowLandingPage: PropTypes.bool.isRequired,
  featureFlags: PropTypes.objectOf(PropTypes.bool),
  location: ReactRouterPropTypes.location.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

Campaign.defaultProps = {
  featureFlags: null,
};

export default Campaign;
