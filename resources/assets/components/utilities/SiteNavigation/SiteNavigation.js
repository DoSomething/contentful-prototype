import React from 'react';
import PropTypes from 'prop-types';

import './site-navigation.scss';
import dsLogo from '../../../images/ds_logo.svg';
import searchIcon from '../../../images/search_icon.svg';

const SiteNavigation = props => (
  <nav role="navigation" className="nav base-12-grid">
    <a href="/" className="logo-nav">
      <img src={dsLogo} alt="DoSomething" />
    </a>

    <ul className="main-nav">
      <li className="main-nav__item">
        <a href="/">Causes</a>
        <div className="main-subnav">
          <div className="wrapper base-12-grid">
            <section className="main-subnav__links main-subnav__links-causes ">
              <h1>
                <a href="/">All Causes</a>
              </h1>
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
            </section>

            <section className="main-subnav__links main-subnav__links-campaigns">
              <h1>
                <a href="/">All Campaigns</a>
              </h1>
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
            </section>

            <section className="main-subnav__featured">
              <img
                className="mb-4"
                src="http://placekitten.com/g/550/250"
                alt="temporary place kitten"
              />
              <h1>Take Back the Kittens</h1>
              <p>Donec ullamcorper nulla non metus auctor fringilla.</p>
              <a href="/">Learn More</a>
            </section>
          </div>
        </div>
      </li>

      <li className="main-nav__item">
        <a href="/">Scholarships</a>
      </li>

      <li className="main-nav__item">
        <a href="/">Articles</a>
      </li>

      <li className="main-nav__item">
        <a href="/">About</a>
      </li>
    </ul>

    <div className="utility-nav">
      {/* <form>
        <input type="text" />
      </form> */}
      <a href="/">
        <img src={searchIcon} alt="search icon" />
      </a>
      <a href="/">Log In</a>
      <a href="/">Join Now</a>
    </div>
  </nav>
);

export default SiteNavigation;

SiteNavigation.propTypes = {};

SiteNavigation.defaultProps = {};
