import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';
import AdminDashboard from '../AdminDashboard';

const Campaign = (props) => {
  const { isAffiliated, useLandingPage, userRole, slug } = props;
  const isAdmin = userRole === 'admin';

  return (
    <div>
      { ! isAdmin ?
        null :
        <AdminDashboard>
          <a className="button -secondary" href={`/next/cache/campaign_${slug}?redirect=${location.pathname}`}>
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
  userRole: PropTypes.string,
  slug: PropTypes.string.isRequired,
};

Campaign.defaultProps = {
  isAffiliated: false,
  useLandingPage: false,
  userRole: null,
};

export default Campaign;
