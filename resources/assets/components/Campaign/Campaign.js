/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';
import AdminDashboard from '../AdminDashboard';

const Campaign = (props) => {
  const { isAffiliated, useLandingPage, isAdmin, slug } = props;

  return (
    <div>
      { ! isAdmin ?
        null :
        <AdminDashboard>
          <a className="button -secondary" href={`/next/cache/campaign_${slug}?redirect=${window.location.pathname}`}>
            Clear Cache
          </a>
        </AdminDashboard>
      }
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
  isAdmin: PropTypes.bool,
  slug: PropTypes.string.isRequired,
};

Campaign.defaultProps = {
  isAffiliated: false,
  useLandingPage: false,
  isAdmin: false,
};

export default Campaign;
