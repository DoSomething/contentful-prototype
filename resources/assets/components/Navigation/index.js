import React from 'react';
import { Link } from 'react-router';
import './navigation.scss';

export const Navigation = ({children}) => (
  <div className="feed-enclosure">
    <div className="wrapper">
      { children }
    </div>
  </div>
);

export const NavigationLink = props => (
  <Link {...props} className="nav-link" activeClassName="is-active" />
);
