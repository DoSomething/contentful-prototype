import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import Account from './Account';
import TestCampaign from './TestCampaign';
import ProfileRoute from './ProfileRoute';

class AccountNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container bg-white padding-top-lg">
          <div className="wrapper">
            <div className="margin-bottom-lg">
              <h1 className="league-gothic-lg caps-lock">
                Welcome, {this.props.user.firstName}!
              </h1>
              <div id="page-navigation" className="page-navigation bg-white">
                <div className="nav-items">
                  <NavLink
                    className="nav-link"
                    activeClassName="is-active"
                    to="/us/profile/campaigns"
                  >
                    Campaigns
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    activeClassName="is-active"
                    to="/us/profile/info"
                  >
                    Account
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-gray margin-top-lg">
          <div className="wrapper bg-gray">
            <Enclosure className="">
              <ProfileRoute {...this.props} />
            </Enclosure>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountNavigation;

AccountNavigation.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};
