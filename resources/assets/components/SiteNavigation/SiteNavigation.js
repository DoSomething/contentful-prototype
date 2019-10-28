/* global document */
/* eslint-disable id-length, jsx-a11y/interactive-supports-focus, jsx-a11y/no-autofocus */

import React from 'react';
import { get } from 'lodash';
import classnames from 'classnames';
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
      searchInput: '',
      activeSubNav: null,
      isSubNavFixed: false,
    };
  }

  analyzeEvent = (event, analytics = {}) => {
    const targets = {
      A: 'link',
      BUTTON: 'button',
    };

    const inferredTarget = get(targets, event.target.tagName, 'element');

    const target = get(analytics, 'target', inferredTarget);

    const context = get(analytics, 'context', {});

    const label = get(analytics, 'label', null);

    trackAnalyticsEvent({
      context: {
        ...getPageContext(),
        ...getUtmContext(),
        referrer: document.referrer,
        ...context,
      },
      metadata: {
        adjective: get(analytics, 'adjective', label),
        category: get(analytics, 'category', 'navigation'),
        label,
        noun: get(analytics, 'noun', 'nav_link'),
        target,
        verb: get(analytics, 'verb', 'clicked'),
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

  handleOnChange = event => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  handleOnClickLink = (event, analytics = {}) => {
    this.analyzeEvent(event, analytics);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  handleOnClickToggle = (event, subNavName, analytics = {}) => {
    event.preventDefault();

    this.analyzeEvent(event, analytics);

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

  handleOnClickClose = (event, analytics = {}) => {
    this.analyzeEvent(event, analytics);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  handleOnSubmit = (event, analytics = {}) => {
    this.analyzeEvent(event, {
      ...analytics,
      context: { searchQuery: this.state.searchInput },
    });
  };

  render() {
    return (
      <nav role="navigation" id="nav" className="nav">
        <div className="wrapper base-12-grid">
          <div className="logo-nav">
            <a
              href="/"
              onClick={e => this.handleOnClickLink(e, { label: 'homepage' })}
            >
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
                href="/us/campaigns"
                onClick={e =>
                  this.handleOnClickToggle(e, 'CausesSubNav', {
                    label: 'campaigns',
                  })
                }
              >
                Campaigns
                <span className="main-nav__arrow" />
              </a>

              {this.state.activeSubNav === 'CausesSubNav' ? (
                <div className="main-subnav menu-subnav">
                  <div className="wrapper base-12-grid">
                    <section className="main-subnav__links-causes menu-subnav__links menu-subnav__section">
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

                    <section className="main-subnav__links-campaigns menu-subnav__links menu-subnav__section">
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

                    <section className="main-subnav__featured menu-subnav__content menu-subnav__section">
                      <a href="/" className="main-subnav__feature">
                        <img
                          className="mb-4"
                          src="http://placekitten.com/g/550/250"
                          alt="temporary place kitten"
                        />
                        <h1 className="main-subnav__feature-title">
                          Take Back the Kittens
                        </h1>
                        <div className="main-subnav__feature-content">
                          <p>
                            Donec ullamcorper nulla non metus auctor fringilla.
                          </p>
                          <p className="main-subnav__feature-link">
                            Learn More
                          </p>
                        </div>
                      </a>
                    </section>

                    {this.state.isSubNavFixed ? (
                      <CloseButton
                        callback={this.handleOnClickClose}
                        className="btn__close--subnav btn__close--main-subnav block"
                        dataLabel="close_subnav"
                        dataNoun="nav_button"
                        size="22px"
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/about/easy-scholarships"
                onClick={e =>
                  this.handleOnClickLink(e, { label: 'scholarships' })
                }
              >
                Scholarships
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="https://lets.dosomething.org"
                onClick={e => this.handleOnClickLink(e, { label: 'articles' })}
              >
                Articles
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/about/who-we-are"
                onClick={e => this.handleOnClickLink(e, { label: 'about' })}
              >
                About
              </a>
            </li>
          </ul>

          <ul className="utility-nav menu-nav">
            <li className="utility-nav__search menu-nav__item">
              <a
                href="#search"
                className={classnames('utility-nav__search-icon', {
                  'is-active': this.state.activeSubNav === 'SearchSubNav',
                })}
                onClick={e =>
                  this.handleOnClickToggle(e, 'SearchSubNav', {
                    label: 'search_form_toggle',
                    noun: 'nav_button',
                  })
                }
              >
                <div className="wrapper">
                  <SearchIcon />
                </div>
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
                      onSubmit={e =>
                        this.handleOnSubmit(e, {
                          category: 'search',
                          label: 'search_subnav',
                          noun: 'nav_form',
                          target: 'form',
                          verb: 'submitted',
                        })
                      }
                    >
                      <SearchIcon />
                      <input
                        type="search"
                        placeholder="Search"
                        name="query"
                        autoFocus
                        onChange={this.handleOnChange}
                        onClick={e =>
                          this.analyzeEvent(e, {
                            category: 'search',
                            label: 'search_subnav',
                            noun: 'nav_form',
                            target: 'form',
                            verb: 'clicked',
                          })
                        }
                        value={this.state.searchInput}
                      />
                    </form>

                    <div className="top-searches">
                      <h1>Top Searches</h1>
                      <ul className="top-searches__link-list">
                        <li>
                          <a
                            href="/us/about/easy-scholarships"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'scholarships_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            scholarships
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=bullying"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'bullying_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            bullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=animals"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'animals_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            animals
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/facts/11-facts-about-cyber-bullying"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'cyberbullying_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            cyberbullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/articles/volunteer-opportunities-for-teens"
                            onClick={e =>
                              this.analyzeEvent(e, {
                                label: 'volunteering_top_search',
                                noun: 'subnav_link',
                              })
                            }
                          >
                            volunteering
                          </a>
                        </li>
                      </ul>
                    </div>

                    <CloseButton
                      callback={e =>
                        this.handleOnClickClose(e, {
                          label: 'close_search_subnav',
                          noun: 'nav_button',
                        })
                      }
                      className="btn__close--subnav btn__close--search-subnav block"
                      size="22px"
                    />
                  </div>
                </div>
              ) : null}
            </li>

            {this.props.isAuthenticated ? (
              <>
                <li className="utility-nav__account-profile menu-nav__item">
                  <a
                    href="/us/account/profile"
                    className="utility-nav__account-profile-icon"
                    onClick={e => this.analyzeEvent(e, { label: 'profile' })}
                  >
                    <ProfileIcon />
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="utility-nav__auth menu-nav__item">
                  <a
                    href={this.props.authLoginUrl}
                    onClick={e => this.analyzeEvent(e, { label: 'log_in' })}
                  >
                    Log In
                  </a>
                </li>

                <li className="utility-nav__join menu-nav__item">
                  <a
                    href={this.props.authRegisterUrl}
                    onClick={e => this.analyzeEvent(e, { label: 'join_now' })}
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
            onClick={e =>
              this.handleOnClickClose(e, {
                label: 'underlay_close_subnav',
                noun: 'nav_element',
              })
            }
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
