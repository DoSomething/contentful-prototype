import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { React, Fragment } from 'react';

import PageQuery from '../PageQuery';
import sponsorList from './sponsor-list';
import * as NewsletterImages from './NewsletterImages';
import HomePageArticleGallery from './HomePageArticleGallery';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import HomePageCampaignGallery from './HomePageCampaignGallery';
import { pageCardFragment } from '../../utilities/PageCard/PageCard';
import { campaignCardFragment } from '../../utilities/CampaignCard/CampaignCard';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import { campaignCardFeaturedFragment } from '../../utilities/CampaignCard/CampaignCardFeatured';
import {
  contentfulImageUrl,
  isAuthenticated,
  tailwind,
} from '../../../helpers';

const HOME_PAGE_QUERY = gql`
  query HomePageQuery($preview: Boolean!) {
    page: homePage(preview: $preview) {
      id
      title
      subTitle
      coverImage {
        url
      }
      campaigns {
        ...CampaignCard
        ...CampaignCardFeatured
      }
      articles {
        ...PageCard
      }
      additionalContent
    }
  }

  ${campaignCardFragment}
  ${campaignCardFeaturedFragment}
  ${pageCardFragment}
`;

const ImpactStatistic = ({ campaignName, impactLabel, impactValue }) => (
  <div className="px-4 py-5 text-center">
    <p className="font-league-gothic leading-none mb-1 text-5xl text-teal-300 uppercase">
      {impactValue}
    </p>
    <p className="font-bold m-0 mb-2 text-lg text-white uppercase">
      {impactLabel}
    </p>
    <p className="italic m-0 text-white">{campaignName}</p>
  </div>
);

ImpactStatistic.propTypes = {
  campaignName: PropTypes.string.isRequired,
  impactLabel: PropTypes.string.isRequired,
  impactValue: PropTypes.string.isRequired,
};

const NewsletterItem = ({ content, image, link, title }) => (
  <div className="flex flex-col h-full">
    <img
      alt={`${title} newsletter badge`}
      className="mb-4 mx-auto"
      css={css`
        height: 180px;
        width: 180px;
      `}
      src={image}
    />
    <h3 className="mb-2 text-white">{title}</h3>
    <p className="mb-4 flex-grow text-white">{content}</p>
    <a
      className="font-normal text-white hover:text-yellow-300 underline hover:no-underline"
      href={link.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {link.copy}
    </a>
  </div>
);

NewsletterItem.propTypes = {
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.shape({
    copy: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

const NewHomePageTemplate = ({ articles, campaigns, coverImage, title }) => {
  const tailwindGray = tailwind('colors.gray');
  const tailwindScreens = tailwind('screens');

  const centerHorizontalRule = css`
    @media (min-width: ${tailwindScreens.md}) {
      margin-top: -2px;
      top: 50%;
    }
  `;

  const headerBackgroundStyles = coverImage
    ? css`
        background-image: url(${contentfulImageUrl(
          coverImage.url,
          '400',
          '775',
          'fill',
        )});

        @media (min-width: ${tailwindScreens.md}) {
          background-image: url(${contentfulImageUrl(
            coverImage.url,
            '700',
            '700',
            'fill',
          )});
        }

        @media (min-width: ${tailwindScreens.lg}) {
          background-image: url(${contentfulImageUrl(
            coverImage.url,
            '1440',
            '539',
            'fill',
          )});
        }
      `
    : null;

  return (
    <Fragment>
      {/* @TODO: Once EmotionJS supports shorthand syntax for React.Fragment, switch <Fragment> out for <> syntax! */}
      <SiteNavigationContainer />

      <main>
        <article data-test="home-page">
          <header role="banner" className="bg-white">
            <div
              className="base-12-grid bg-gray-200 pt-3 md:pt-6"
              css={css`
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                padding-bottom: 250px;

                @media (min-width: ${tailwindScreens.md}) {
                  padding-bottom: 100px;
                }

                ${headerBackgroundStyles}
              `}
            >
              <h1
                className="font-league-gothic font-normal grid-wide m-0 px-2 md:px-0 lg:px-16 py-24 text-yellow-500 text-center uppercase"
                css={css`
                  font-size: 84px;
                  line-height: 1.1;

                  @media (min-width: ${tailwindScreens.md}) {
                    font-size: 120px;
                  }
                `}
              >
                {title}
              </h1>
            </div>

            <div
              className="base-12-grid"
              css={css`
                margin-top: -250px;

                @media (min-width: ${tailwindScreens.md}) {
                  margin-top: -100px;
                }
              `}
            >
              <div className="bg-blurple-500 py-4 grid-wide xl:grid xl:grid-cols-3">
                <ImpactStatistic
                  campaignName="Teens for Jeans"
                  impactLabel="Jeans Donated"
                  impactValue="5 million"
                />

                <ImpactStatistic
                  campaignName="Get the Filter Out"
                  impactLabel="Cigarette Butts Collected"
                  impactValue="3.7 million"
                />

                <ImpactStatistic
                  campaignName="Power to the Period"
                  impactLabel="Period Products Donated"
                  impactValue="585,965"
                />
              </div>
            </div>
          </header>

          {campaigns ? (
            <section
              className="base-12-grid bg-gray-100 py-8"
              css={css`
                background: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1) 25%,
                  ${tailwindGray['100']}
                );
              `}
              data-test="campaigns-section"
            >
              <div className="grid-wide text-center">
                <h2 className="mb-6 relative">
                  <span className="bg-white font-league-gothic font-normal leading-tight inline-block px-6 relative text-3xl md:text-4xl uppercase z-10">
                    Take Action
                  </span>
                  <span
                    className="absolute bg-purple-500 block h-1 w-full z-0"
                    css={centerHorizontalRule}
                  />
                </h2>

                <p className="mb-6 lg:mb-8 text-lg">
                  Choose a campaign below to make an impact and enter for a
                  chance to{' '}
                  <a
                    href="/us/about/easy-scholarships"
                    className="font-normal text-blurple-500 hover:text-blurple-300 underline hover:no-underline"
                  >
                    earn scholarships
                  </a>
                  . (Talk about a win-win.)
                </p>

                <HomePageCampaignGallery campaigns={campaigns} />

                <a
                  href="/us/campaigns"
                  className="btn bg-blurple-500 hover:bg-blurple-300 focus:bg-blurple-700 inline-block mt-8 hover:no-underline py-4 px-8 text-lg hover:text-white"
                >
                  See More Campaigns
                </a>
              </div>
            </section>
          ) : null}

          <article
            className="base-12-grid bg-purple-700 py-8 lg:py-12"
            data-test="newsletters-cta"
          >
            <div className="grid-wide text-center">
              <h2 className="text-white mb-4">
                <span className="block lg:inline-block font-league-gothic font-normal tracking-wide text-4xl uppercase">
                  Get Inspired.
                </span>{' '}
                <span className="block lg:inline-block font-league-gothic font-normal lg:px-1 tracking-wide text-4xl uppercase">
                  Get Entertained.
                </span>{' '}
                <span className="block lg:inline-block font-league-gothic font-normal tracking-wide text-4xl uppercase">
                  Get Active.
                </span>
              </h2>
              <p className="text-lg text-white">
                Sign up for one of our newsletters.
              </p>

              <ul className="md:col-gap-8 lg:col-gap-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 row-gap-8">
                <li className="text-white">
                  <NewsletterItem
                    content="Create change with millions of others."
                    title="Community"
                    image={NewsletterImages.Community}
                    link={{
                      copy: 'Join the Communty',
                      url: 'https://wyd.dosomething.org',
                    }}
                  />
                </li>

                <li className="text-white">
                  <NewsletterItem
                    content="Make an impact on today's headlines."
                    title="News"
                    image={NewsletterImages.News}
                    link={{
                      copy: 'Get News',
                      url: 'https://breakdown.dosomething.org',
                    }}
                  />
                </li>

                <li className="text-white">
                  <NewsletterItem
                    content="Live your best life and help others do the same."
                    title="Lifestyle"
                    image={NewsletterImages.Lifestyle}
                    link={{
                      copy: 'Start Reading',
                      url: 'https://boost.dosomething.org',
                    }}
                  />
                </li>

                <li className="text-white">
                  <NewsletterItem
                    content="Qualify for easy scholarships, no GPA or essay required."
                    title="Scholarships"
                    image={NewsletterImages.Scholarships}
                    link={{
                      copy: 'Find Scholarships',
                      url: 'https://pays.dosomething.org',
                    }}
                  />
                </li>
              </ul>
            </div>
          </article>

          {articles ? (
            <section
              className="base-12-grid bg-gray-100 py-8"
              data-test="articles-section"
            >
              <div className="grid-wide text-center">
                <h2 className="mb-6 relative">
                  <span className="bg-gray-100 font-league-gothic font-normal leading-tight inline-block px-6 relative text-3xl md:text-4xl uppercase z-10">
                    Read About It
                  </span>
                  <span
                    className="absolute bg-purple-500 block h-1 w-full z-0"
                    css={centerHorizontalRule}
                  />
                </h2>

                <HomePageArticleGallery articles={articles} />

                <a
                  href="/us/articles"
                  className="btn bg-blurple-500 hover:bg-blurple-300 focus:bg-blurple-700 inline-block mt-8 hover:no-underline py-4 px-8 text-lg hover:text-white"
                >
                  See More Articles
                </a>
              </div>
            </section>
          ) : null}

          {/* @TODO: Need to remove the top/bottom padding from base-12-grid class and
          let components add their own padding otherwise it is hard to override. */}
          <section
            className="base-12-grid bg-white py-8"
            data-test="sponsors-section"
          >
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

          {isAuthenticated() ? null : (
            <article
              className="base-12-grid bg-yellow-500 py-16"
              data-test="signup-cta"
            >
              <div className="xl:flex grid-wide xl:items-center text-center">
                <div className="text-left xl:w-8/12">
                  <h1 className="font-bold text-2xl">
                    Join our youth-led movement for good
                  </h1>
                  <p className="text-lg">
                    Make an impact with millions of young people, and earn easy
                    scholarships for volunteering.
                  </p>
                </div>

                <div className="flex-grow">
                  <a
                    href="/authorize"
                    className="btn bg-blurple-500 hover:bg-blurple-300 inline-block mt-8 xl:m-0 hover:no-underline py-4 px-16 text-lg hover:text-white xl:ml-auto"
                  >
                    Join Now
                  </a>
                </div>
              </div>
            </article>
          )}
        </article>
      </main>

      <SiteFooter />
    </Fragment>
  );
};

NewHomePageTemplate.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  campaigns: PropTypes.arrayOf(PropTypes.object),
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

NewHomePageTemplate.defaultProps = {
  articles: null,
  campaigns: null,
  coverImage: null,
  title: 'We Are A Youth-Led Movement For Good',
};

const NewHomePage = () => (
  <PageQuery query={HOME_PAGE_QUERY}>
    {page => <NewHomePageTemplate {...page} />}
  </PageQuery>
);

export default NewHomePage;
