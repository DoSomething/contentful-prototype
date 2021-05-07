/* global document */
/* eslint-disable id-length, jsx-a11y/interactive-supports-focus, jsx-a11y/no-autofocus */

import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SearchBar from './SearchBar';
import CauseList from './CauseList';
import TopSearchesList from './TopSearchesList';
import SearchIcon from '../artifacts/SearchIcon/SearchIcon';
import SiteNavigationFeature from './SiteNavigationFeature';
import CloseButton from '../artifacts/CloseButton/CloseButton';
import ProfileIcon from '../artifacts/ProfileIcon/ProfileIcon';
import BenefitsGallery from './BenefitsGallery/BenefitsGallery';
import DoSomethingLogo from '../utilities/DoSomethingLogo/DoSomethingLogo';
import { query } from '../../helpers/url';
import {
  EVENT_CATEGORIES,
  getUtmContext,
  getPageContext,
  trackAnalyticsEvent,
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

  /**
   * Parse event data and trigger analytics event.
   *
   * @param  {Object} data
   * @return {null}
   */
  analyzeEvent = (data = {}) => {
    const { action, category, label, name, context = {} } = data;

    trackAnalyticsEvent(name, {
      action,
      category,
      label,
      context: {
        ...getPageContext(),
        ...getUtmContext(),
        referrer: document.referrer,
        ...context,
      },
    });
  };

  /**
   * Handle mouse enter events, or otherwise hovering onto an element.
   *
   * @param  {String} subNavName
   * @return {null}
   */
  handleMouseEnter = subNavName => {
    const { isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      return;
    }

    this.setState({
      activeSubNav: subNavName,
    });
  };

  /**
   * Handle mouse leave events, or otherwise hovering off of an element.
   *
   * @return {null}
   */
  handleMouseLeave = () => {
    const { isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      return;
    }

    this.setState({
      activeSubNav: null,
    });
  };

  /**
   * Handle on click events on an element.
   *
   * @param  {Object} analytics
   * @return {null}
   */
  handleOnClickLink = (analytics = {}) => {
    this.analyzeEvent(analytics);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  /**
   * Handle on click events that toggle an element.
   *
   * @param  {Object} event
   * @param  {String} subNavName
   * @param  {Object} analytics
   * @return {null}
   */
  handleOnClickToggle = (event, subNavName, analytics = {}) => {
    event.preventDefault();

    this.analyzeEvent(analytics);

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

  /**
   * Handle on click events that close a menu item.
   *
   * @param  {Object} analytics
   * @return {null}
   */
  handleOnClickClose = (analytics = {}) => {
    this.analyzeEvent(analytics);

    this.setState({
      activeSubNav: null,
      isSubNavFixed: false,
    });
  };

  render() {
    // Hide navigation if we're in "chromeless" mode, e.g. for an embed:
    if (query('chromeless')) {
      return null;
    }

    return (
      <nav role="navigation" id="nav" className="site-navigation">
        <div className="wrapper base-12-grid">
          <div className="logo-nav">
            <a
              href="/"
              onClick={() =>
                this.handleOnClickLink({
                  name: 'clicked_nav_link_homepage',
                  action: 'link_clicked',
                  category: EVENT_CATEGORIES.navigation,
                  label: 'homepage',
                })
              }
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
              <Media
                queries={{
                  large: '(min-width: 960px)',
                }}
              >
                {matches => (
                  <a
                    id="main-nav__causes"
                    href={matches.large ? '/campaigns' : '/'}
                    onClick={e =>
                      matches.large
                        ? this.handleOnClickLink({
                            name: 'clicked_nav_link_causes',
                            action: 'link_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'causes',
                          })
                        : this.handleOnClickToggle(e, 'CausesSubNav', {
                            name: 'clicked_nav_link_causes',
                            action: 'link_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'causes',
                          })
                    }
                  >
                    Causes
                    <span className="main-nav__arrow" />
                  </a>
                )}
              </Media>

              {this.state.activeSubNav === 'CausesSubNav' ? (
                <div className="main-subnav menu-subnav">
                  <div className="wrapper base-12-grid py-3 md:py-6">
                    <section className="main-subnav__links-causes menu-subnav__links menu-subnav__section">
                      <h1>Causes</h1>

                      <CauseList handleClick={this.handleOnClickLink} />
                    </section>

                    <section className="main-subnav__featured menu-subnav__content menu-subnav__section">
                      <SiteNavigationFeature
                        imageSrc="https://images.ctfassets.net/81iqaqpfd8fy/k03WbCKtErFHbmk8gkcdR/17ea0ce8bf7bc82aa0a50ded42b4d369/racial_justice_and_the_election.jpg?fit=fill&h=500&w=1100"
                        imageAlt="Young person wearing hat and face mask holds up a hand-made Black Lives Matter sign with a crowd of people behind them"
                        url="/us/collections/racial-justice-election"
                        title="Racial Justice Hub"
                        text="Read articles, find resources, and take action to fight for racial justice."
                        moreLinkText="Get Started"
                        callback={() =>
                          this.analyzeEvent({
                            name:
                              'clicked_subnav_link_feature_racial_justice_collection',
                            action: 'link_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'feature_racial_justice_collection',
                          })
                        }
                      />
                    </section>

                    {this.state.isSubNavFixed ? (
                      <CloseButton
                        callback={() =>
                          this.handleOnClickClose({
                            name: 'clicked_nav_button_close_subnav',
                            action: 'button_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'close_subnav',
                          })
                        }
                        className="btn__close--subnav btn__close--main-subnav block"
                        size="22px"
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}
            </li>

            <li
              className={classnames('menu-nav__item', {
                'is-active': this.state.activeSubNav === 'BenefitsSubNav',
              })}
              onMouseEnter={() => this.handleMouseEnter('BenefitsSubNav')}
              onMouseLeave={() => this.handleMouseLeave('BenefitsSubNav')}
            >
              <Media
                queries={{
                  large: '(min-width: 960px)',
                }}
              >
                {matches => (
                  <a
                    id="main-nav__benefits"
                    href={matches.large ? '/us/about/benefits' : '/'}
                    onClick={e =>
                      matches.large
                        ? this.handleOnClickLink({
                            name: 'clicked_nav_link_benefits',
                            action: 'link_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'benefits',
                          })
                        : this.handleOnClickToggle(e, 'BenefitsSubNav', {
                            name: 'clicked_nav_link_benefits',
                            action: 'link_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'benefits_scholarships',
                          })
                    }
                  >
                    Benefits
                    <span className="main-nav__arrow" />
                  </a>
                )}
              </Media>

              {this.state.activeSubNav === 'BenefitsSubNav' ? (
                <div className="main-subnav menu-subnav">
                  <div className="wrapper base-12-grid py-3 md:py-6">
                    {this.state.isSubNavFixed ? (
                      <CloseButton
                        callback={() =>
                          this.handleOnClickClose({
                            name: 'clicked_nav_button_close_subnav',
                            action: 'button_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'close_subnav',
                          })
                        }
                        className="btn__close--subnav btn__close--main-subnav block"
                        size="22px"
                      />
                    ) : null}

                    <div className="grid-wide mt-12 md:mt-16 lg:mt-0">
                      <BenefitsGallery />
                    </div>
                  </div>
                </div>
              ) : null}
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/articles"
                onClick={() =>
                  this.handleOnClickLink({
                    name: 'clicked_nav_link_articles',
                    action: 'link_clicked',
                    category: EVENT_CATEGORIES.navigation,
                    label: 'articles',
                  })
                }
              >
                Articles
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="/us/about"
                onClick={() =>
                  this.handleOnClickLink({
                    name: 'clicked_nav_link_about',
                    action: 'link_clicked',
                    category: EVENT_CATEGORIES.navigation,
                    label: 'about',
                  })
                }
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
                    name: 'clicked_nav_button_search_form_toggle',
                    action: 'link_clicked',
                    category: EVENT_CATEGORIES.navigation,
                    label: 'search_form_toggle',
                  })
                }
              >
                <div className="wrapper">
                  <SearchIcon />
                </div>
              </a>

              {this.state.activeSubNav === 'SearchSubNav' ? (
                <div className="utility-subnav menu-subnav" name="search">
                  <div className="wrapper base-12-grid py-3 md:py-6">
                    <SearchBar />

                    <TopSearchesList />

                    <CloseButton
                      callback={() =>
                        this.handleOnClickClose({
                          name: 'clicked_nav_button_close_search_subnav',
                          action: 'button_clicked',
                          category: EVENT_CATEGORIES.navigation,
                          label: 'close_search_subnav',
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
                    id="utility-nav__account-profile"
                    href="/us/account"
                    className="utility-nav__account-profile-icon"
                    onClick={() =>
                      this.analyzeEvent({
                        name: 'clicked_nav_link_profile',
                        action: 'link_clicked',
                        category: EVENT_CATEGORIES.navigation,
                        label: 'profile',
                      })
                    }
                  >
                    <ProfileIcon />
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="utility-nav__auth menu-nav__item">
                  <a
                    id="utility-nav__auth"
                    href={this.props.authLoginUrl}
                    onClick={() =>
                      this.analyzeEvent({
                        name: 'clicked_nav_link_log_in',
                        action: 'link_clicked',
                        category: EVENT_CATEGORIES.navigation,
                        label: 'log_in',
                      })
                    }
                  >
                    Log In
                  </a>
                </li>

                <li className="utility-nav__join menu-nav__item">
                  <a
                    id="utility-nav__join"
                    href={this.props.authRegisterUrl}
                    onClick={() =>
                      this.analyzeEvent({
                        name: 'clicked_nav_link_join_now',
                        action: 'link_clicked',
                        category: EVENT_CATEGORIES.navigation,
                        label: 'join_now',
                      })
                    }
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
            onClick={() =>
              this.handleOnClickClose({
                name: 'clicked_nav_element_underlay_close_subnav',
                action: 'element_clicked',
                category: EVENT_CATEGORIES.navigation,
                label: 'underlay_close_subnav',
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
