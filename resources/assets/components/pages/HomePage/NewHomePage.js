/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';

import tailwindScreens from '../../../../../tailwind.screens';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const NewHomePage = () => {
  return (
    <>
      <SiteNavigationContainer />

      {/* <img
        src="https://images.ctfassets.net/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?fit=fill&h=539&w=1440"
        alt="homepage banner"
        className="absolute"
      /> */}

      <main>
        <article>
          <header
            role="banner"
            className="bg-white p-4"
            css={css`
              background-image: url('https://images.ctfassets.net/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?fit=fill&h=775&w=400');
              background-size: 100% auto;
              background-repeat: no-repeat;
              @media (min-width: ${tailwindScreens.md}) {
                background-image: url('https://images.ctfassets.net/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?fit=fill&h=539&w=1440');
              }
            `}
          >
            <div className="">
              <h1
                className="font-league-gothic font-normal leading-none m-0 text-yellow-500 text-center uppercase"
                css={css`
                  font-size: 84px;
                  @media (min-width: ${tailwindScreens.md}) {
                    font-size: 120px;
                  }
                `}
              >
                We are a youth-led movement for good
              </h1>
            </div>

            <div className="bg-blurple-500 py-5">
              <div className="px-4 py-5 text-center">
                <p className="font-league-gothic text-5xl text-teal-300 uppercase">
                  5 million+
                </p>
                <p className="m-0 text-white uppercase">Jeans Donated</p>
                <p className="italic m-0 text-white">Teens for Jeans</p>
              </div>

              <div className="px-4 py-5 text-center">
                <p className="font-league-gothic text-5xl text-teal-300 uppercase">
                  3.7 million+
                </p>
                <p className="m-0 text-white uppercase">
                  Cigarette Butts Collected
                </p>
                <p className="italic m-0 text-white">Get the Filter Out</p>
              </div>

              <div className="px-4 py-5 text-center">
                <p className="font-league-gothic text-5xl text-teal-300 uppercase">
                  1,572+
                </p>
                <p className="m-0 text-white uppercase">Photographs Burned</p>
                <p className="italic m-0 text-white">Breakup Bash</p>
              </div>
            </div>
          </header>

          <section
            className="base-12-grid bg-gray-100"
            css={css`
              background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            `}
          >
            <div className="grid-wide">
              <h1>Take Action</h1>

              <p>
                You can even{' '}
                <a href="/us/about/easy-scholarships">win scholarships</a> and{' '}
                <a href="/">earn volunteer credits</a> for school! Seriously.
              </p>

              <a href="/us/campaigns" className="btn bg-blurple-500">
                See More Campaigns
              </a>
            </div>
          </section>

          <article className="base-12-grid bg-purple-400">
            <div className="grid-wide">
              <h1>Get Inspired. Get Entertained. Get Active.</h1>
              <p>Sign up for one of our newsletters.</p>
            </div>
          </article>

          <section className="base-12-grid bg-gray-100">
            <div className="grid-wide">
              <h2>Read About It</h2>

              <a
                href="/us/articles"
                className="btn bg-blurple-500 focus:bg-blurple-700"
              >
                See More Articles
              </a>
            </div>
          </section>

          <section className="base-12-grid bg-white h-40">
            <div className="grid-wide">
              <h2>Sponsors</h2>
            </div>
          </section>

          <article className="base-12-grid bg-yellow-500">
            <div className="grid-wide">
              <h1>Join our youth-led movement for good</h1>
              <p>
                Make an impact with millions of young people, and earn easy
                scholarships for volunteering.
              </p>
              <a href="/authorize" className="btn bg-blurple-500">
                Join Now
              </a>
            </div>
          </article>
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

export default NewHomePage;
