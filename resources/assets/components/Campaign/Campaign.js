import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';
import AdminDashboard from '../AdminDashboard';

const Campaign = (props) => {
  const { isAffiliated, useLandingPage, userRole } = props;
  const isAdmin = userRole === 'admin';

  return (
    <div>
      { isAdmin ? <AdminDashboard redirectPath={props.location.pathname} /> : null }
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
};

Campaign.defaultProps = {
  isAffiliated: false,
  useLandingPage: false,
  userRole: null,
};

export default Campaign;
