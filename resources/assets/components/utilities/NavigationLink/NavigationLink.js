import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

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
