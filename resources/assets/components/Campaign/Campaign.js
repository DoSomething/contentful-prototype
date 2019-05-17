import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import NotificationContainer from '../Notification';
import SurveyModal from '../pages/SurveyModal/SurveyModal';
import ModalRoute from '../utilities/ModalRoute/ModalRoute';
import ModalLauncher from '../utilities/Modal/ModalLauncher';
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

    {props.isAuthenticated ? (
      <TrafficDistribution percentage={100} feature="nps_survey">
        <ModalLauncher
          type="nps_survey"
          countdown={1}
          render={() => (
            <SurveyModal
              typeformUrl="https://dosomething.typeform.com/to/Bvcwvm"
              queryParameters={{
                campaign_id: props.campaignId,
                northstar_id: props.userId,
              }}
              redirectParameters={{
                hide_nps_survey: 1,
              }}
            />
          )}
        />
      </TrafficDistribution>
    ) : null}

    {props.isAuthenticated &&
    props.featureFlags &&
    props.featureFlags.showVoterRegistrationModal ? (
      <TrafficDistribution percentage={50} feature="voter_reg_modal">
        <ModalLauncher
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
  isAuthenticated: PropTypes.bool,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  userId: PropTypes.string,
};

Campaign.defaultProps = {
  campaignId: null,
  featureFlags: null,
  isAuthenticated: false,
  userId: null,
};

export default Campaign;
