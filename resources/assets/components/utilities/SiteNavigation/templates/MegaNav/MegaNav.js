import React from 'react';

import CloseButton from '../../../CloseButton/CloseButton';
import DoSomethingLogo from '../../../DoSomethingLogo/DoSomethingLogo';
import searchIcon from '../../../../../images/search_icon.svg';
// import { toggleClassHandler } from '../../../../../helpers';

class MegaNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFixedDropdown: false,
    };
  }

  componentDidMount() {
    this.nav = document.getElementById('nav');
    this.searchSubnav = document.getElementById('utility-subnav__search');
  }

  toggleSearch = event => {
    event.preventDefault();

    const isShowingFixedDropdown = this.state.showFixedDropdown;

    this.setState({
      showFixedDropdown: !isShowingFixedDropdown,
    });

    this.nav.classList.toggle('is-showing-subnav');
    this.searchSubnav.classList.toggle('is-visible');

    console.log('😜', event, this.searchSubnav);
  };

  addShowSubNavClass = () => {
    if (!this.state.showFixedDropdown) {
      this.nav.classList.add('is-showing-subnav');
    }
  };

  removeShowSubNavClass = () => {
    if (!this.state.showFixedDropdown) {
      this.nav.classList.remove('is-showing-subnav');
    }
  };

  logEvent = event => {
    event.preventDefault();

    console.log('🌈', event);
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
                href="/"
                onMouseEnter={this.addShowSubNavClass}
                onMouseLeave={this.removeShowSubNavClass}
                onTouchEnd={this.logEvent}
              >
                Causes
              </a>

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
                onClick={this.toggleSearch}
              >
                <img src={searchIcon} alt="search icon" />
              </a>

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
                    callback={this.toggleSearch}
                    className="btn__close--search-subnav"
                  />
                </div>
              </form>
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

export default MegaNav;
