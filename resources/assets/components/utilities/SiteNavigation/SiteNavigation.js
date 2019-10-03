import React from 'react';

import './site-navigation.scss';
import dsLogo from '../../../images/ds_logo.svg';
import searchIcon from '../../../images/search_icon.svg';

const SiteNavigation = () => (
  <nav role="navigation" className="nav base-12-grid">
    <div className="logo-nav">
      <a href="/">
        <img src={dsLogo} alt="DoSomething" />
      </a>
    </div>

    <ul className="main-nav menu-nav">
      <li className="menu-nav__item">
        <a href="/">Causes</a>

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
        <a href="/" className="utility-nav__search-icon">
          <img src={searchIcon} alt="search icon" />
        </a>

        <form className="utility-subnav menu-subnav">
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
  </nav>
);

export default SiteNavigation;
