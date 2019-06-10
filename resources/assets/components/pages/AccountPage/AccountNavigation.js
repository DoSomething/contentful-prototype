import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const AccountNavigation = (props) => (
  <div className="page-navigation -no-fade">
    <div className="nav-items">
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/campaigns"
      >
        Campaigns
      </NavLink>
      { props.user.hasFeatureFlag ?
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/profile/badges"
      >
        Badges
      </NavLink> : null
      }
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        exact
        to="/us/account/profile"
      >
        Profile
      </NavLink>
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/profile/subscriptions"
      >
        Subscriptions
      </NavLink>
    </div>
  </div>
);

AccountNavigation.propTypes = {
  user: PropTypes.shape({
    hasFeatureFlag: PropTypes.bool,
  }).isRequired,
};

export default AccountNavigation;
