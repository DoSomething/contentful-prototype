import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountNavigation = () => (
  <div className="page-navigation -no-fade">
    <div className="nav-items">
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/campaigns"
      >
        Campaigns
      </NavLink>
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
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/profile/badges"
      >
        Badges
      </NavLink>
    </div>
  </div>
);

export default AccountNavigation;
