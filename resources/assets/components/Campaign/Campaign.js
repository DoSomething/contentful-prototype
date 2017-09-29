import React from 'react';
import PropTypes from 'prop-types';

import ModalSwitch from '../Modal';
import { CampaignPageContainer, LandingPageContainer } from '../Page';
import NotificationContainer from '../Notification';

const Campaign = (props) => {
  const { isAffiliated, useLandingPage } = props;

  return (
    <div>
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
};

Campaign.defaultProps = {
  isAffiliated: false,
  useLandingPage: false,
};

export default Campaign;
