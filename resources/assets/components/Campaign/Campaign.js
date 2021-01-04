import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Modal from '../utilities/Modal/Modal';
import { featureFlag } from '../../helpers/env';
import NotificationContainer from '../Notification';
import ModalRoute from '../utilities/ModalRoute/ModalRoute';
import SiteFooter from '../utilities/SiteFooter/SiteFooter';
import TypeFormEmbed from '../utilities/TypeFormEmbed/TypeFormEmbed';
import DelayedElement from '../utilities/DelayedElement/DelayedElement';
import CampaignRouteContainer from './CampaignRoute/CampaignRouteContainer';
import SiteNavigationContainer from '../SiteNavigation/SiteNavigationContainer';
import DismissableElement from '../utilities/DismissableElement/DismissableElement';
import TrafficDistribution from '../utilities/TrafficDistribution/TrafficDistribution';
import LegacyAdminDashboardContainer from '../LegacyAdminDashboard/LegacyAdminDashboardContainer';
import LegacyCampaignDashboardContainer from '../LegacyAdminDashboard/LegacyCampaignDashboard/LegacyCampaignDashboardContainer';

const Campaign = props => (
  <ModalRoute
    history={props.history}
    location={props.location}
    match={props.match}
  >
    <SiteNavigationContainer />

    <main>
      <LegacyAdminDashboardContainer>
        <LegacyCampaignDashboardContainer />
      </LegacyAdminDashboardContainer>

      <NotificationContainer />

      {props.isAuthenticated &&
      featureFlag('nps_survey') &&
      !featureFlag('sitewide_nps_survey') ? (
        <TrafficDistribution percentage={5} feature="nps_survey">
          <DismissableElement
            name="nps_survey"
            render={(handleClose, handleComplete) => (
              <DelayedElement delay={60}>
                <Modal onClose={handleClose} trackingId="SURVEY_MODAL">
                  <TypeFormEmbed
                    displayType="modal"
                    typeformUrl="https://dosomething.typeform.com/to/Bvcwvm"
                    queryParameters={{
                      campaign_id: props.campaignId,
                      northstar_id: props.userId,
                    }}
                    onSubmit={handleComplete}
                  />
                </Modal>
              </DelayedElement>
            )}
          />
        </TrafficDistribution>
      ) : null}

      <CampaignRouteContainer {...props} />
    </main>

    <SiteFooter />
  </ModalRoute>
);

Campaign.propTypes = {
  campaignId: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
  isAuthenticated: PropTypes.bool,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  userId: PropTypes.string,
};

Campaign.defaultProps = {
  campaignId: null,
  isAuthenticated: false,
  userId: null,
};

export default Campaign;
