import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import AccountRoute from './AccountRoute';
import AccountNavigation from './AccountNavigation';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const Account = props => (
  <>
    <SiteNavigationContainer />

    <Enclosure className="">
      <div className="bg-white">
        <div className="base-12-grid">
          <div className="grid-wide pt-16">
            <h1 className="league-gothic -lg caps-lock">
              Welcome, {props.user.firstName}!
            </h1>
            <AccountNavigation {...props} />
          </div>
        </div>
      </div>

      <div className="bg-gray">
        <div className="base-12-grid">
          <AccountRoute {...props} />
        </div>
      </div>
    </Enclosure>
  </>
);

Account.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default Account;
