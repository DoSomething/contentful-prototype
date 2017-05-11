import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import FeedEnclosure from '../FeedEnclosure';
import classnames from 'classnames';

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

export const NavigationLink = ({ to, children, active }) => {
  return <Link to={to} children={children} className={classnames('nav-link', {'is-active': active})} />
}

// export const NavigationLink = props => (
//   <Link {...props} className="nav-link" activeClassName="is-active" />
// );
