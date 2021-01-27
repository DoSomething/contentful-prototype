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
                  <>
                    {matches.large ? (
                      <a
                        id="main-nav__causes"
                        href="/campaigns"
                        onClick={() =>
                          this.handleOnClickLink({
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
                    ) : (
                      <a
                        id="main-nav__causes"
                        href="/"
                        onClick={e =>
                          this.handleOnClickToggle(e, 'CausesSubNav', {
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
                  </>
                )}
              </Media>

              {this.state.activeSubNav === 'CausesSubNav' ? (
                <div className="main-subnav menu-subnav">
                  <div className="wrapper base-12-grid py-3 md:py-6">
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
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_education',
                              });
                            }}
                          >
                            Education
                          </a>
                          <a
                            href="/us/causes/gun-violence"
                            onClick={() => {
                              this.handleOnClickLink({
                                name: 'clicked_subnav_link_causes_gun_violence',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_gun_violence',
                              });
                            }}
                          >
                            Gun Violence
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
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_mental_health',
                              });
                            }}
                          >
                            Mental Health
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/physical-health"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_physical_health',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_physical_health',
                              });
                            }}
                          >
                            Physical Health
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
                                category: EVENT_CATEGORIES.navigation,
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
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_environment',
                              });
                            }}
                          >
                            Environment
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/sexual-harassment"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_sexual_harassment',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_sexual_harassment',
                              });
                            }}
                          >
                            Sexual Harassment
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/bullying"
                            onClick={() => {
                              this.handleOnClickLink({
                                name: 'clicked_subnav_link_causes_bullying',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_bullying',
                              });
                            }}
                          >
                            Bullying
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/gender-rights"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_gender_rights',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_gender_rights',
                              });
                            }}
                          >
                            Gender Rights
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/racial-justice"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_racial_justice',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_racial_justice',
                              });
                            }}
                          >
                            Racial Justice
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/discrimination"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_discrimination',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_discrimination',
                              });
                            }}
                          >
                            Discrimination
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/lgbtq-rights"
                            onClick={() => {
                              this.handleOnClickLink({
                                name: 'clicked_subnav_link_causes_lgbtq_rights',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_lgbtq_rights',
                              });
                            }}
                          >
                            LGBTQ+ Rights
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/causes/voter-registration"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_causes_voter_registration',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'causes_voter_registration',
                              });
                            }}
                          >
                            Voter Registration
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
                                category: EVENT_CATEGORIES.navigation,
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
                  <>
                    {matches.large ? (
                      <a
                        id="main-nav__benefits"
                        href="/us/about/benefits"
                        onClick={() =>
                          this.handleOnClickLink({
                            name: 'clicked_nav_link_benefits',
                            action: 'link_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'benefits',
                          })
                        }
                      >
                        Benefits
                        <span className="main-nav__arrow" />
                      </a>
                    ) : (
                      <a
                        id="main-nav__benefits"
                        href="/"
                        onClick={e =>
                          this.handleOnClickToggle(e, 'BenefitsSubNav', {
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
                  </>
                )}
              </Media>

              {this.state.activeSubNav === 'BenefitsSubNav' ? (
                <div className="main-subnav menu-subnav">
                  <div className="wrapper base-12-grid py-3 md:py-6">
                    <section className="main-subnav__links-benefits menu-subnav__links menu-subnav__section">
                      <h1>Benefits</h1>
                      <ul>
                        <li>
                          <a
                            href="/us/about/easy-scholarships"
                            onClick={() => {
                              this.handleOnClickLink({
                                name:
                                  'clicked_subnav_link_benefits_scholarships',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'benefits_scholarships',
                              });
                            }}
                          >
                            Scholarships
                          </a>
                        </li>
                        <li>
                          <a
                            href="/us/about/volunteer-hours"
                            onClick={() => {
                              this.handleOnClickLink({
                                name: 'clicked_subnav_link_benefits_volunteer',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'benefits_scholarships',
                              });
                            }}
                          >
                            Volunteer Credits
                          </a>
                        </li>
                      </ul>
                    </section>

                    <section className="main-subnav__featured menu-subnav__content menu-subnav__section">
                      <SiteNavigationFeature
                        imageSrc="https://images.ctfassets.net/81iqaqpfd8fy/5atz8qkRKqMd6RnNbu8TyS/e2856278db6218801d07ecc6326b3b81/strenth_though_service_header_photo_Artboard_1_copy_5.png"
                        imageAlt="Image with text in center that reads 'Strength Through Service' and is surround by illustration of hands with hearts in their palms, reaching towards the text"
                        url="/us/about/benefits"
                        title="Volunteer Credits"
                        text="Earn a certificate verifying your volunteer hours"
                        moreLinkText="Get Started"
                        callback={() =>
                          this.analyzeEvent({
                            name:
                              'clicked_subnav_link_feature_benefits_volunteer_hours',
                            action: 'link_clicked',
                            category: EVENT_CATEGORIES.navigation,
                            label: 'feature_benefits_volunteer_hours',
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

            <li className="menu-nav__item">
              <a
                href="https://lets.dosomething.org"
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
                href="https://join.dosomething.org/"
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
                          category: EVENT_CATEGORIES.search,
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
                            category: EVENT_CATEGORIES.search,
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
                                category: EVENT_CATEGORIES.navigation,
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
                                category: EVENT_CATEGORIES.navigation,
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
                                category: EVENT_CATEGORIES.navigation,
                                label: 'animals_top_search',
                              })
                            }
                          >
                            animals
                          </a>
                        </li>

                        <li>
                          <a
                            href="/us/collections/corona-virus-campaigns"
                            onClick={() =>
                              this.analyzeEvent({
                                name: 'clicked_subnav_link_covid_top_search',
                                action: 'link_clicked',
                                category: EVENT_CATEGORIES.navigation,
                                label: 'covid_top_search',
                              })
                            }
                          >
                            covid
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
                                category: EVENT_CATEGORIES.navigation,
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
