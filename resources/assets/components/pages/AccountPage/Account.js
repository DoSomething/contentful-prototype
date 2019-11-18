import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import AccountRoute from './AccountRoute';
import AccountNavigation from './AccountNavigation';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const Account = props => (
  <>
    <SiteNavigationContainer />

    <Enclosure>
      <div className="bg-white">
        <div className="base-12-grid">
          <div className="grid-wide pt-12">
            <h1 className="font-league-gothic font-normal text-4xl md:text-5xl uppercase">
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
