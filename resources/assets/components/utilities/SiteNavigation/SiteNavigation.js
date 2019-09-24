import React from 'react';
import PropTypes from 'prop-types';

import './site-navigation.scss';
import dsLogo from '../../../images/ds_logo.svg';

const SiteNavigation = props => (
  <nav role="navigation" className="nav base-12-grid">
    <a href="/" className="logo">
      <img src={dsLogo} alt="DoSomething" />
    </a>

    <ul className="main-nav">
      <li>
        <a href="/">Causes</a>
        <div className="hidden">
          <div>
            <a href="/">Causes</a>
            <ul>
              <li>
                <a href="/">Education</a>
              </li>
              <li>
                <a href="/">Mental Health</a>
              </li>
              <li>
                <a href="/">Homelessness & Poverty</a>
              </li>
              <li>
                <a href="/">Environment</a>
              </li>
              <li>
                <a href="/">Animal Welfare</a>
              </li>
              <li>
                <a href="/">Sexual Harassment</a>
              </li>
              <li>
                <a href="/">Bullying</a>
              </li>
              <li>
                <a href="/">Gender Rights</a>
              </li>
              <li>
                <a href="/">Racial Justice</a>
              </li>
              <li>
                <a href="/">Immigration & Refugees</a>
              </li>
              <li>
                <a href="/">LGBT+ Rights</a>
              </li>
              <li>
                <a href="/">Get Out the Vote!</a>
              </li>
            </ul>
          </div>

          <div>
            <a href="/">Campaigns</a>
            <ul>
              <li>
                <a href="/">Online</a>
              </li>
              <li>
                <a href="/">In-person</a>
              </li>
              <li>
                <a href="/">Petitions</a>
              </li>
              <li>
                <a href="/">Collections</a>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <li>
        <a href="/">Scholarships</a>
      </li>

      <li>
        <a href="/">Articles</a>
      </li>

      <li>
        <a href="/">About</a>
      </li>
    </ul>

    <div className="utility-nav">
      <form>
        <input type="text" />
      </form>

      <a href="/">Log In</a>
      <a href="/">Join Now</a>
    </div>
  </nav>
);

export default SiteNavigation;

SiteNavigation.propTypes = {};

SiteNavigation.defaultProps = {};
