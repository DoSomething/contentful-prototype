import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
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

export const NavigationLink = props => (
  <NavLink {...props} className={classnames('nav-link', props.className)} activeClassName="is-active">{ props.children }</NavLink>
);

NavigationLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

NavigationLink.defaultProps = {
  className: null,
};
