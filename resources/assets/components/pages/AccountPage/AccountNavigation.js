/* eslint-disable id-length */

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  trackAnalyticsEvent,
  getPageContext,
  getUtmContext,
} from '../../../helpers/analytics';

const AccountNavigation = props => (
  <div className="page-navigation -no-fade">
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
      <a
        className="nav-link"
        href="/deauthorize"
        onClick={() =>
          trackAnalyticsEvent({
            context: {
              ...getPageContext(),
              ...getUtmContext(),
            },
            metadata: {
              adjective: 'log_out',
              category: 'navigation',
              label: 'log_out',
              noun: 'nav_link',
              target: 'link',
              verb: 'clicked',
            },
          })
        }
      >
        Log Out
      </a>
    </div>
  </div>
);

AccountNavigation.propTypes = {
  user: PropTypes.shape({
    hasBadgesFlag: PropTypes.bool,
  }).isRequired,
};

export default AccountNavigation;
