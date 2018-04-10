import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

const NavigationLink = props => (
  <NavLink
    {...props}
    className={classnames('nav-link', props.className)}
    activeClassName="is-active"
  >
    {props.children}
  </NavLink>
);

NavigationLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

NavigationLink.defaultProps = {
  className: null,
};

export default NavigationLink;
