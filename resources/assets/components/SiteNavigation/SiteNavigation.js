/* global document */
/* eslint-disable id-length, jsx-a11y/interactive-supports-focus */

import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import searchIcon from '../../images/search-icon.svg';
import CloseButton from '../utilities/CloseButton/CloseButton';
import ProfileIcon from '../utilities/ProfileIcon/ProfileIcon';
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
            <li
              className={classnames('menu-nav__item', {
                'is-active': this.state.activeSubNav === 'CausesSubNav',
              })}
              onMouseEnter={() => this.handleMouseEnter('CausesSubNav')}
              onMouseLeave={() => this.handleMouseLeave('CausesSubNav')}
            >
              <a
                href="/"
                data-label="causes"
                onClick={event =>
                  this.handleOnClickToggle(event, 'CausesSubNav')
                }
              >
                Causes
              </a>

              {this.state.activeSubNav === 'CausesSubNav' ? (
                <div className="main-subnav menu-subnav">
                  <div className="wrapper base-12-grid">
                    <section className="main-subnav__links-causes menu-subnav__links">
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

                    <section className="main-subnav__links-campaigns menu-subnav__links">
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

                    <section className="main-subnav__featured menu-subnav__content">
                      <img
                        className="mb-4"
                        src="http://placekitten.com/g/550/250"
                        alt="temporary place kitten"
                      />
                      <h1>Take Back the Kittens</h1>
                      <p>Donec ullamcorper nulla non metus auctor fringilla.</p>
                      <a href="/">Learn More</a>
                    </section>

                    <CloseButton
                      callback={this.handleOnClickClose}
                      className="btn__close--subnav btn__close--main-subnav block p-1"
                      dataLabel="close_subnav"
                      dataNoun="nav_button"
                      size="22px"
                    />
                  </div>
                </div>
              ) : null}
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
                href="/"
                className="utility-nav__search-icon"
                onClick={event =>
                  this.handleOnClickToggle(event, 'SearchSubNav')
                }
              >
                <img src={searchIcon} alt="search icon" />
              </a>

              {this.state.activeSubNav === 'SearchSubNav' ? (
                <form
                  className="utility-subnav menu-subnav"
                  id="utility-subnav__search"
                >
                  <div className="wrapper base-12-grid">
                    <div className="search">
                      <input type="text" />
                    </div>

                    <div className="top-searches">
                      <h1>Top Searches</h1>
                      <ul>
                        <li>
                          <a href="https://www.dosomething.org/us/search?query=scholarships">
                            scholarships
                          </a>
                        </li>

                        <li>
                          <a href="https://www.dosomething.org/us/search?query=cyberbullying">
                            cyberbullying
                          </a>
                        </li>

                        <li>
                          <a href="https://www.dosomething.org/us/search?query=gun+violence">
                            gun violence
                          </a>
                        </li>

                        <li>
                          <a href="https://www.dosomething.org/us/search?query=climate+change">
                            climate change
                          </a>
                        </li>
                      </ul>
                    </div>

                    <CloseButton
                      callback={this.handleOnClickClose}
                      className="btn__close--subnav btn__close--search-subnav block p-1"
                      dataLabel="close_subnav"
                      dataNoun="nav_button"
                      size="22px"
                    />
                  </div>
                </form>
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
