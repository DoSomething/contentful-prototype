import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const AccountNavigation = props => (
  <nav className="page-navigation -no-fade">
    <div className="nav-items">
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/campaigns"
      >
        Campaigns
      </NavLink>
      {props.user.hasBadgesFlag ? (
        <NavLink
          className="nav-link"
          activeClassName="is-active"
          to="/us/account/profile/badges"
        >
          Badges
        </NavLink>
      ) : null}
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
  </nav>
);

AccountNavigation.propTypes = {
  user: PropTypes.shape({
    hasBadgesFlag: PropTypes.bool,
  }).isRequired,
};

export default AccountNavigation;
