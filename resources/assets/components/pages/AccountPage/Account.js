import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import AccountNavigation from './AccountNavigation';
import AccountRoute from './AccountRoute';

const Account = props => (
  <Enclosure className="container margin-bottom-lg ">
    <div className="container bg-white padding-top-lg padding-horizontal-md">
      <div className="wrapper padding-bottom-lg">
        <h1 className="league-gothic -lg caps-lock">
          Welcome, {props.user.firstName}!
        </h1>
        <AccountNavigation {...props} />
      </div>
    </div>

    <div className="container bg-gray margin-top-lg padding-horizontal-md">
      <div className="wrapper bg-gray">
        <AccountRoute {...props} />
      </div>
    </div>
  </Enclosure>
);

Account.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default Account;
