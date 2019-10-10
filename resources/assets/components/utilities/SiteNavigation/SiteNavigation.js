import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from '../CloseButton/CloseButton';
import searchIcon from '../../../images/search-icon.svg';
import DoSomethingLogo from '../DoSomethingLogo/DoSomethingLogo';

import './site-navigation.scss';

class SiteNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
      isSubNavFixed: false,
    };
  }

  handleMouseEnter = subNavName => {
    // console.log('🔥');

    const { active, isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      // && active !== subNavName) {
      return;
    }

    this.setState({
      active: subNavName,
    });
  };

  handleMouseLeave = subNavName => {
    // console.log('💧');

    const { active, isSubNavFixed } = this.state;

    if (isSubNavFixed) {
      // && active !== subNavName) {
      return;
    }

    this.setState({
      active: null,
    });
  };

  handleOnClickToggle = (event, subNavName) => {
    event.preventDefault();

    const { active, isSubNavFixed } = this.state;

    // console.log('🚀');
    // console.log(event);

    if (active === subNavName && isSubNavFixed) {
      this.setState({
        active: null,
        isSubNavFixed: false,
      });

      return;
    }

    if (active === subNavName && !isSubNavFixed) {
      this.setState({
        isSubNavFixed: true,
      });

      return;
    }

    this.setState({
      active: subNavName,
      isSubNavFixed: true,
    });
  };

  handleOnClickClose = subNavName => {
    console.log('ⅹ');

    this.setState({
      active: null,
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
              className="menu-nav__item"
              onMouseEnter={() => this.handleMouseEnter('CausesSubNav')}
              onMouseLeave={() => this.handleMouseLeave('CausesSubNav')}
            >
              <a
                href="/"
                onClick={event =>
                  this.handleOnClickToggle(event, 'CausesSubNav')
                }
              >
                Causes
              </a>

              {this.state.active === 'CausesSubNav' ? (
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
                  </div>
                </div>
              ) : null}
            </li>

            <li className="menu-nav__item">
              <a href="/">Scholarships</a>
            </li>

            <li className="menu-nav__item">
              <a href="/">Articles</a>
            </li>

            <li className="menu-nav__item">
              <a href="/">About</a>
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

              {this.state.active === 'SearchSubNav' ? (
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
                      callback={() => this.handleOnClickClose('SearchSubNav')}
                      className="btn__close--search-subnav p-1"
                      size="22px"
                    />
                  </div>
                </form>
              ) : null}
            </li>

            <li className="utility-nav__auth menu-nav__item">
              <a href="/">Log In</a>
            </li>

            <li className="utility-nav__join menu-nav__item">
              <a href="/">Join Now</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

SiteNavigation.propTypes = {
  template: PropTypes.string,
};

SiteNavigation.defaultProps = {
  template: null,
};

export default SiteNavigation;
