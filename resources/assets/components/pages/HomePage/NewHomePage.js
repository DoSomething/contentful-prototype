/** @jsx jsx */

import gql from 'graphql-tag';
import { Fragment } from 'react';
import { jsx, css } from '@emotion/core';

import PageQuery from '../PageQuery';
import sponsorList from './sponsor-list';
import { contentfulImageUrl } from '../../../helpers';
import tailwindScreens from '../../../../../tailwind.screens';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import HomePageCampaignGallery from './HomePageCampaignGallery';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const HOME_PAGE_QUERY = gql`
  query HomePageQuery($preview: Boolean!) {
    page: homePage(preview: $preview) {
      id
      title
      subTitle
      campaigns {
        __typename
        ... on Showcasable {
          showcaseTitle
          showcaseDescription
          showcaseImage {
            url
          }
        }
        ... on CampaignWebsite {
          id
          url
        }
        ... on StoryPageWebsite {
          id
          url
        }
      }
      articles {
        showcaseTitle
        showcaseDescription
        showcaseImage {
          url
        }
        slug
      }
      additionalContent
    }
  }
`;

const NewHomePageTemplate = ({
  additionalContent,
  articles,
  campaigns,
  subTitle,
  title,
}) => {
  const centerHorizontalRule = css`
    @media (min-width: ${tailwindScreens.md}) {
      margin-top: -2px;
      top: 50%;
    }
  `;

  return (
    <Fragment>
      {/* @TODO: Once EmotionJS supports shorthand syntax for React.Fragment, switch <Fragment> out for <> syntax! */}
      <SiteNavigationContainer />

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
                background-image: url('https://images.ctfassets.net/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?fit=fill&h=700&w=700');
              }
              @media (min-width: ${tailwindScreens.lg}) {
                background-image: url('https://images.ctfassets.net/81iqaqpfd8fy/4k8rv5sN0kii0AoCawc6UQ/c22c3c132d1bb43055b6bafc248fcea5/vn7gpbosm9rx.jpg?fit=fill&h=539&w=1440');
              }
            `}
          >
            <div className="">
              <h1
                className="font-league-gothic font-normal leading-none m-0 py-24 text-yellow-500 text-center uppercase"
                css={css`
                  font-size: 84px;
                  @media (min-width: ${tailwindScreens.md}) {
                    font-size: 120px;
                  }
                `}
              >
                {title}
              </h1>
            </div>

            <div
              className="bg-blurple-500 py-5"
              css={css`
                @media (min-width: ${tailwindScreens.md}) {
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr;
                }
              `}
            >
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
                rgba(255, 255, 255, 1) 25%,
                rgba(255, 255, 255, 0) 100%
              );
            `}
          >
            <div className="grid-wide text-center">
              <h2 className="relative">
                <span className="bg-white font-league-gothic font-normal leading-tight inline-block py-2 px-6 relative text-3xl tracking-wide uppercase z-10">
                  Take Action
                </span>
                <span
                  className="absolute bg-purple-500 block h-1 w-full z-0"
                  css={centerHorizontalRule}
                />
              </h2>

              <p className="my-6">
                You can even{' '}
                <a href="/us/about/easy-scholarships">win scholarships</a> and{' '}
                <a href="/">earn volunteer credits</a> for school! Seriously.
              </p>

              <HomePageCampaignGallery campaigns={campaigns} />

              <a
                href="/us/campaigns"
                className="btn bg-blurple-500 focus:bg-blurple-700 inline-block my-8 py-4 px-8 text-lg"
              >
                See More Campaigns
              </a>
            </div>
          </section>

          <article className="base-12-grid bg-purple-400">
            <div className="grid-wide text-center">
              <h2 className="text-white">
                <span className="block lg:inline-block font-league-gothic font-normal tracking-wide text-3xl uppercase">
                  Get Inspired.
                </span>{' '}
                <span className="block lg:inline-block font-league-gothic font-normal lg:px-1 tracking-wide text-3xl uppercase">
                  Get Entertained.
                </span>{' '}
                <span className="block lg:inline-block font-league-gothic font-normal tracking-wide text-3xl uppercase">
                  Get Active.
                </span>
              </h2>

              <p className="text-lg text-white">
                Sign up for one of our newsletters.
              </p>
            </div>
          </article>

          <section className="base-12-grid bg-gray-100">
            <div className="grid-wide text-center">
              <h2 className="relative">
                <span className="bg-gray-100 font-league-gothic font-normal leading-tight inline-block py-2 px-6 relative text-3xl tracking-wide uppercase z-10">
                  Read About It
                </span>
                <span
                  className="absolute bg-purple-500 block h-1 w-full z-0"
                  css={centerHorizontalRule}
                />
              </h2>

              {/* <HomePageArticlesGallery /> */}

              <a
                href="/us/articles"
                className="btn bg-blurple-500 focus:bg-blurple-700 inline-block my-8 py-4 px-8 text-lg"
              >
                See More Articles
              </a>
            </div>
          </section>

          {/* @TODO: Need to remove the top/bottom padding from base-12-grid class and
          let components add their own padding otherwise it is hard to override. */}
          <section className="base-12-grid bg-white py-8">
            <div className="grid-wide text-center">
              <h2 className="font-bold mb-3 text-base text-center text-gray-500 uppercase">
                Sponsors
              </h2>
              <ul>
                {sponsorList.map(sponsor => (
                  <li key={sponsor.name} className="inline-block mx-6 my-3">
                    <img
                      className="opacity-25"
                      src={contentfulImageUrl(sponsor.image, '125', '40')}
                      title={sponsor.name}
                      alt={sponsor.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* @TODO: See earlier comment regarding base-12-grid. */}
          <article className="base-12-grid bg-yellow-500 py-4">
            <div className="grid-wide py-4 text-center">
              <div className="text-left">
                <h1 className="font-bold text-2xl">
                  Join our youth-led movement for good
                </h1>
                <p className="text-lg">
                  Make an impact with millions of young people, and earn easy
                  scholarships for volunteering.
                </p>
              </div>

              <a
                href="/authorize"
                className="btn bg-blurple-500 inline-block mt-8 py-4 px-16 text-lg"
              >
                Join Now
              </a>
            </div>
          </article>
        </article>
      </main>

      <SiteFooter />
    </Fragment>
  );
};

const NewHomePage = () => (
  <PageQuery query={HOME_PAGE_QUERY}>
    {page => <NewHomePageTemplate {...page} />}
  </PageQuery>
);

export default NewHomePage;
