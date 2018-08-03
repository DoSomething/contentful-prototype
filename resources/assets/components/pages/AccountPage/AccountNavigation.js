import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountNavigation = () => (
  <div id="page-navigation" className="page-navigation bg-white">
    <div className="nav-items">
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/posts"
      >
        Posts
      </NavLink>
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/account/profile"
      >
        Profile
      </NavLink>
    </div>
  </div>
);

export default AccountNavigation;
