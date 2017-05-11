import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import FeedEnclosure from '../FeedEnclosure';

import './navigation.scss';

export const Navigation = ({ children }) => (
  <FeedEnclosure>
    <div className="nav">
      { children }
    </div>
  </FeedEnclosure>
);

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
};

export const NavigationLink = ({ to, children, active }) => (
  <Link to={to} className={classnames('nav-link', { 'is-active': active })}>
    { children }
  </Link>
);

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

NavigationLink.defaultProps = {
  active: false,
};
