/* global document */
/* eslint-disable id-length, jsx-a11y/interactive-supports-focus, jsx-a11y/no-autofocus */

import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SearchIcon from '../artifacts/SearchIcon/SearchIcon';
import SiteNavigationFeature from './SiteNavigationFeature';
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
   * Handle on change event on form inputs.
   *
   * @param  {Object} event
   * @return {null}
   */
  handleOnChange = event => {
    this.setState({
      searchInput: event.target.value,
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
                  category: 'navigation',
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
                  <>
                    {matches.large ? (
                      <a
                        id="main-nav__causes"
                        href="/campaigns"
                        onClick={() =>
                          this.handleOnClickLink({
                            name: 'clicked_nav_link_causes',
                            action: 'link_clicked',
                            category: 'navigation',
                            label: 'causes',
                          })
                        }
                      >
                        Causes
                        <span className="main-nav__arrow" />
                      </a>
                    ) : (
                      <a
                        id="main-nav__causes"
                        href="/"
                        onClick={e =>
                          this.handleOnClickToggle(e, 'CausesSubNav', {
                            name: 'clicked_nav_link_causes',
                            action: 'link_clicked',
                            category: 'navigation',
                            label: 'causes',
                          })
                        }
                      >
                        Causes
                        <span className="main-nav__arrow" />
                      </a>
                    )}
                  </>
                )}
              </Media>

              {this.state.activeSubNav === 'CausesSubNav' ? (
                <div className="main-subnav menu-subnav">
                  <div className="wrapper base-12-grid">
                    <section className="main-subnav__links-causes menu-subnav__links menu-subnav__section">
                      <h1>Causes</h1>
                      <ul>
                        <li>
                          <a
                            href="/us/causes/education"
                            onClick={() => {
                              this.handleOnClickLink({
                                name: 'clicked_subnav_link_causes_education',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'causes_education',
                              });
                            }}
                          >
                            Education
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/mental-health"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_mental_health',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'causes_mental_health',
                              });
                            }}
                          >
                            Mental Health
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/homelessness-and-poverty"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_homelessness_and_poverty',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'causes_homelessness_and_poverty',
                              });
                            }}
                          >
                            Homelessness & Poverty
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/environment"
                            onClick={() => {
                              this.handleOnClickLink({
                                name: 'clicked_subnav_link_causes_environment',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'causes_environment',
                              });
                            }}
                          >
                            Environment
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/bullying"
                            onClick={() => {
                              this.handleOnClickLink({
                                name: 'clicked_subnav_link_causes_bullying',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'causes_bullying',
                              });
                            }}
                          >
                            Bullying
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/campaigns"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_all_campaigns',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'causes_all_campaigns',
                              });
                            }}
                          >
                            All Campaigns
                          </a>
                        </li>
                      </ul>
                    </section>

                    <section className="main-subnav__featured menu-subnav__content menu-subnav__section">
                      <SiteNavigationFeature
                        imageSrc="https://images.ctfassets.net/81iqaqpfd8fy/5md4atcQCcWCMomiO22iyU/02de733ce619eb881fe69a9793e9bee9/pasted_image_at_2017_04_26_04_12_pm.png?fit=fill&h=500&w=1100"
                        imageAlt="Mirror adorned with positive post it notes"
                        url="/us/campaigns/mirror-messages"
                        title="Mirror Messages"
                        text="Create and post encouraging notes in your school bathrooms to brighten your classmates' day!"
                        callback={() =>
                          this.analyzeEvent({
                            name: 'clicked_subnav_link_feature_mirror_messages',
                            action: 'link_clicked',
                            category: 'navigation',
                            label: 'feature_mirror_messages',
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
                            category: 'navigation',
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

            <li className="menu-nav__item">
              <a
                href="/us/about/easy-scholarships"
                onClick={() =>
                  this.handleOnClickLink({
                    name: 'clicked_nav_link_scholarships',
                    action: 'link_clicked',
                    category: 'navigation',
                    label: 'scholarships',
                  })
                }
              >
                Scholarships
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="https://lets.dosomething.org"
                onClick={() =>
                  this.handleOnClickLink({
                    name: 'clicked_nav_link_articles',
                    action: 'link_clicked',
                    category: 'navigation',
                    label: 'articles',
                  })
                }
              >
                Articles
              </a>
            </li>

            <li className="menu-nav__item">
              <a
                href="https://join.dosomething.org/"
                onClick={() =>
                  this.handleOnClickLink({
                    name: 'clicked_nav_link_about',
                    action: 'link_clicked',
                    category: 'navigation',
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
                    category: 'navigation',
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
                  <div className="wrapper base-12-grid">
                    <form
                      className="search"
                      id="utility-subnav__search"
                      acceptCharset="UTF-8"
                      action="/us/search"
                      method="GET"
                      onSubmit={() =>
                        this.analyzeEvent({
                          name: 'submitted_nav_form_search_subnav',
                          action: 'form_submitted',
                          category: 'search',
                          label: 'search_subnav',
                          context: { searchQuery: this.state.searchInput },
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
                        onClick={() =>
                          this.analyzeEvent({
                            name: 'clicked_nav_form_search_subnav',
                            action: 'form_clicked',
                            category: 'search',
                            label: 'search_subnav',
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
                            onClick={() =>
                              this.analyzeEvent({
                                name:
                                  'clicked_subnav_link_scholarships_top_search',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'scholarships_top_search',
                              })
                            }
                          >
                            scholarships
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=bullying"
                            onClick={() =>
                              this.analyzeEvent({
                                name: 'clicked_subnav_link_bullying_top_search',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'bullying_top_search',
                              })
                            }
                          >
                            bullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/search?query=animals"
                            onClick={() =>
                              this.analyzeEvent({
                                name: 'clicked_subnav_link_animals_top_search',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'animals_top_search',
                              })
                            }
                          >
                            animals
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/facts/11-facts-about-cyber-bullying"
                            onClick={() =>
                              this.analyzeEvent({
                                name:
                                  'clicked_subnav_link_cyberbullying_top_search',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'cyberbullying_top_search',
                              })
                            }
                          >
                            cyberbullying
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/articles/volunteer-opportunities-for-teens"
                            onClick={() =>
                              this.analyzeEvent({
                                name:
                                  'clicked_subnav_link_volunteering_top_search',
                                action: 'link_clicked',
                                category: 'navigation',
                                label: 'volunteering_top_search',
                              })
                            }
                          >
                            volunteering
                          </a>
                        </li>
                      </ul>
                    </div>

                    <CloseButton
                      callback={() =>
                        this.handleOnClickClose({
                          name: 'clicked_nav_button_close_search_subnav',
                          action: 'button_clicked',
                          category: 'navigation',
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
                    href="/us/account/profile"
                    className="utility-nav__account-profile-icon"
                    onClick={() =>
                      this.analyzeEvent({
                        name: 'clicked_nav_link_profile',
                        action: 'link_clicked',
                        category: 'navigation',
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
                        category: 'navigation',
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
                        category: 'navigation',
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
                category: 'navigation',
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
