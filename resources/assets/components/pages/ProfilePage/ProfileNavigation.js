import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileNavigation = () => (
  <div id="page-navigation" className="page-navigation bg-white">
    <div className="nav-items">
      <NavLink
        className="nav-link"
        activeClassName="is-active"
        to="/us/profile/posts"
      >
        Posts
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
);

export default ProfileNavigation;
