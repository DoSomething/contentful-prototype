/* global document */
/* eslint-disable id-length, jsx-a11y/interactive-supports-focus */

import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import SearchIcon from '../artifacts/SearchIcon/SearchIcon';
import CloseButton from '../artifacts/CloseButton/CloseButton';
import ProfileIcon from '../artifacts/ProfileIcon/ProfileIcon';
import DoSomethingLogo from '../utilities/DoSomethingLogo/DoSomethingLogo';
import {
  trackAnalyticsEvent,
  getUtmContext,
  getPageContext,
} from '../../helpers/analytics';

import './site-navigation.scss';

class SiteNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSubNav: null,
      isSubNavFixed: false,
    };
  }

  analyzeEvent = event => {
    const targets = {
      A: 'link',
      BUTTON: 'button',
    };

    const target = get(targets, event.target.tagName, 'element');

    trackAnalyticsEvent({
      context: {
        ...getUtmContext(),
        ...getPageContext(),
        referrer: document.referrer,
      },
      metadata: {
        adjective: event.target.dataset.label,
        category: 'navigation',
        label: event.target.dataset.label,
        noun: event.target.dataset.noun || 'nav_link',
        target,
        verb: 'clicked',
      },
    });
  };

  handleMouseEnter = subNavName => {
    const { isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      return;
    }

    this.setState({
      activeSubNav: subNavName,
    });
  };

  handleMouseLeave = () => {
    const { isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      return;
    }

    this.setState({
      activeSubNav: null,
    });
  };

  handleOnClickLink = event => {
    this.analyzeEvent(event);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  handleOnClickToggle = (event, subNavName) => {
    event.preventDefault();

    this.analyzeEvent(event);

    const { activeSubNav, isSubNavFixed } = this.state;

    if (activeSubNav === subNavName && isSubNavFixed) {
      this.setState({
        activeSubNav: null,
        isSubNavFixed: false,
      });

      return;
    }

    if (activeSubNav === subNavName && !isSubNavFixed) {
      this.setState({
        isSubNavFixed: true,
      });

      return;
    }

    this.setState({
      activeSubNav: subNavName,
      isSubNavFixed: true,
    });
  };

  handleOnClickClose = event => {
    this.analyzeEvent(event);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  render() {
    return (
      <nav role="navigation" id="nav" className="nav">
        <div className="wrapper base-12-grid">
          <div className="logo-nav">
            <a href="/">
              <DoSomethingLogo />
            </a>
          </div>

          <ul className="main-nav menu-nav">
            <li className="menu-nav__item">
              <a
                href="/us/campaigns"
                data-label="causes"
                onClick={this.handleOnClickLink}
              >
                Causes
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/about/easy-scholarships"
                data-label="scholarships"
                onClick={this.handleOnClickLink}
              >
                Scholarships
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="https://lets.dosomething.org"
                data-label="articles"
                onClick={this.handleOnClickLink}
              >
                Articles
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/about/who-we-are"
                data-label="about"
                onClick={this.handleOnClickLink}
              >
                About
              </a>
            </li>
          </ul>

          <ul className="utility-nav menu-nav">
            <li className="utility-nav__search menu-nav__item">
              <a
                href="#search"
                className="utility-nav__search-icon"
                data-label="search-form-toggle"
                data-noun="nav-button"
                onClick={e => this.handleOnClickToggle(e, 'SearchSubNav')}
              >
                <SearchIcon />
              </a>

              {this.state.activeSubNav === 'SearchSubNav' ? (
                <div className="utility-subnav menu-subnav" name="search">
                  <div className="wrapper base-12-grid">
                    <form
                      className="search"
                      id="utility-subnav__search"
                      acceptCharset="UTF-8"
                      action="/us/search"
                      method="GET"
                    >
                      <SearchIcon />
                      <input type="search" placeholder="Search" name="query" />
                    </form>

                    <div className="top-searches">
                      <h1>Top Searches</h1>
                      <ul className="top-searches__link-list">
                        <li>
                          <a
                            href="/us/about/easy-scholarships"
                            data-label="scholarships-top-search"
                            data-noun="subnav-link"
                            onClick={this.analyzeEvent}
                          >
                            scholarships
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=bullying"
                            data-label="bullying-top-search"
                            data-noun="subnav-link"
                            onClick={this.analyzeEvent}
                          >
                            bullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=animals"
                            data-label="animals-top-search"
                            data-noun="subnav-link"
                            onClick={this.analyzeEvent}
                          >
                            animals
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/facts/11-facts-about-cyber-bullying"
                            data-label="cyberbullying-top-search"
                            data-noun="subnav-link"
                            onClick={this.analyzeEvent}
                          >
                            cyberbullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/articles/volunteer-opportunities-for-teens"
                            data-label="volunteering-top-search"
                            data-noun="subnav-link"
                            onClick={this.analyzeEvent}
                          >
                            volunteering
                          </a>
                        </li>
                      </ul>
                    </div>

                    <CloseButton
                      callback={this.handleOnClickClose}
                      className="btn__close--subnav btn__close--search-subnav block"
                      dataLabel="close_subnav"
                      dataNoun="nav_button"
                      size="22px"
                    />
                  </div>
                </div>
              ) : null}
            </li>

            {this.props.isAuthenticated ? (
              <>
                <li className="utility-nav__account-profile menu-nav__item">
                  <a href="/us/account/profile">
                    <ProfileIcon />
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="utility-nav__auth menu-nav__item">
                  <a
                    href={this.props.authLoginUrl}
                    data-label="log-in"
                    onClick={this.analyzeEvent}
                  >
                    Log In
                  </a>
                </li>

                <li className="utility-nav__join menu-nav__item">
                  <a
                    href={this.props.authRegisterUrl}
                    data-label="join_now"
                    onClick={this.analyzeEvent}
                  >
                    Join Now
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {this.state.activeSubNav ? (
          <div
            className="underlay"
            data-label="underlay_close_subnav"
            data-noun="nav_element"
            onClick={this.handleOnClickClose}
            role="button"
          />
        ) : null}
      </nav>
    );
  }
}

SiteNavigation.propTypes = {
  authLoginUrl: PropTypes.string.isRequired,
  authRegisterUrl: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default SiteNavigation;
