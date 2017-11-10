/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';
import AdminDashboardContainer from '../AdminDashboard';

const Campaign = (props) => {
  const { isAffiliated, useLandingPage, slug } = props;

  return (
    <div>
      <AdminDashboardContainer>
        <a className="button -secondary" href={`/next/cache/campaign_${slug}?redirect=${window.location.pathname}`}>
          Clear Cache
        </a>
      </AdminDashboardContainer>
      <NotificationContainer />
      <ModalSwitch />

      {(! isAffiliated && useLandingPage) ?
        <LandingPageContainer {...props} />
        :
        <CampaignPageContainer {...props} />}
    </div>
  );
};

Campaign.propTypes = {
  isAffiliated: PropTypes.bool,
  useLandingPage: PropTypes.bool,
  slug: PropTypes.string.isRequired,
};

Campaign.defaultProps = {
  isAffiliated: false,
  useLandingPage: false,
};

export default Campaign;
