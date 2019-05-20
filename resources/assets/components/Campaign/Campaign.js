import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import NotificationContainer from '../Notification';
import ModalLauncherContainer from '../ModalLauncher';
import ModalRoute from '../utilities/ModalRoute/ModalRoute';
import SurveyModal from '../pages/SurveyModal/SurveyModal';
import CampaignRouteContainer from './CampaignRoute/CampaignRouteContainer';
import TrafficDistribution from '../utilities/TrafficDistribution/TrafficDistribution';
import VoterRegistrationModal from '../pages/VoterRegistrationModal/VoterRegistrationModal';
import {
  AdminDashboardContainer,
  CampaignDashboardContainer,
} from '../AdminDashboard';

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

    <TrafficDistribution percentage={5} feature="nps_survey">
      <ModalLauncherContainer
        type="nps_survey"
        countdown={60}
        render={() => (
          <SurveyModal
            typeformUrl="https://dosomething.typeform.com/to/Bvcwvm"
            queryParameters={{
              campaign_id: props.campaignId,
              northstar_id: props.userId,
              hide_nps_survey: 1,
            }}
          />
        )}
      />
    </TrafficDistribution>

    {props.featureFlags && props.featureFlags.showVoterRegistrationModal ? (
      <TrafficDistribution percentage={50} feature="voter_reg_modal">
        <ModalLauncherContainer
          type="voter_reg_modal"
          countdown={30}
          render={() => <VoterRegistrationModal />}
        />
      </TrafficDistribution>
    ) : null}

    <CampaignRouteContainer {...props} />
  </ModalRoute>
);

Campaign.propTypes = {
  campaignId: PropTypes.string,
  featureFlags: PropTypes.objectOf(PropTypes.bool),
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  userId: PropTypes.string,
};

Campaign.defaultProps = {
  campaignId: null,
  featureFlags: null,
  userId: null,
};

export default Campaign;
