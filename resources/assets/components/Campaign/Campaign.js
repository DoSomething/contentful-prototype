/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';
import AdminDashboardContainer from '../AdminDashboard';

class Campaign extends React.Component {

  render() {
    const { isAffiliated, useLandingPage, slug, clickedShowAffirmation } = this.props;

    return (
      <div>
        <AdminDashboardContainer>
          <a className="button -secondary margin-horizontal-md" href={`/next/cache/campaign_${slug}?redirect=${window.location.pathname}`}>
            Clear Cache
          </a>
          <button className="button -secondary margin-horizontal-md" onClick={clickedShowAffirmation}>
            Show Affirmation
          </button>
        </AdminDashboardContainer>

        <NotificationContainer />
        <ModalSwitch />

        { (! isAffiliated && useLandingPage) ?
          <LandingPageContainer {...this.props} />
          :
          <CampaignPageContainer {...this.props} />}
      </div>
    );
  }
}

Campaign.propTypes = {
  isAffiliated: PropTypes.bool,
  useLandingPage: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  clickedShowAffirmation: PropTypes.func.isRequired,
};

Campaign.defaultProps = {
  isAffiliated: false,
  useLandingPage: false,
};

export default Campaign;
