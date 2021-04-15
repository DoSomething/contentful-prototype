import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { React, Fragment } from 'react';

import PageQuery from '../PageQuery';
import { isAuthenticated } from '../../../helpers/auth';
import HomePageArticleGallery from './HomePageArticleGallery';
import * as MemberBenefitsImages from './MemberBenefitsImages';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import { contentfulImageUrl } from '../../../helpers/contentful';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import { pageCardFragment } from '../../utilities/PageCard/PageCard';
import CampaignGallery from '../../utilities/Gallery/CampaignGallery';
import { coverImageMediaQueryStyles, tailwind } from '../../../helpers/display';
import BannerCallToAction from '../../utilities/CallToAction/BannerCallToAction';
import { campaignCardFragment } from '../../utilities/CampaignCard/CampaignCard';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import { campaignCardFeaturedFragment } from '../../utilities/CampaignCard/CampaignCardFeatured';

const HOME_PAGE_QUERY = gql`
  query HomePageQuery($preview: Boolean!) {
    page: homePage(preview: $preview) {
      id
      title
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
      sponsors {
        title
        logo {
          url
        }
      }
      additionalContent
    }
  }

  ${campaignCardFragment}
  ${campaignCardFeaturedFragment}
  ${pageCardFragment}
`;

/**
 * Impact statistic component for homepage header banner.
 *
 * @param {Object}
 */
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

/**
 * Benefit item for member benefits section.
 *
 * @param {Object}
 */
const BenefitItem = ({ content, image, link, title }) => (
  <div className="flex flex-col h-full">
    <a className="block mb-4 mx-auto no-underline" href={link.url}>
      <img
        alt={`${title} member benefits badge`}
        css={css`
          height: 180px;
          width: 180px;
        `}
        src={image}
      />
    </a>

    <h3 className="mb-2">
      <a
        className="text-white font-bold no-underline hover:text-yellow-300"
        href={link.url}
        css={css`
          &:hover {
            text-decoration-color: ${tailwind('colors.yellow.300')};
          }
        `}
      >
        {title}
      </a>
    </h3>

    <p className="mb-4 flex-grow text-white">{content}</p>

    <a
      className="font-normal text-white hover:text-yellow-300 underline hover:no-underline"
      data-label={`member_benefits_cta_${title.toLowerCase()}`}
      href={link.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {link.copy}
    </a>
  </div>
);

BenefitItem.propTypes = {
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.shape({
    copy: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

/**
 * Home Page template.
 *
 * @param {Object}
 */
const HomePageTemplate = ({
  articles,
  campaigns,
  coverImage,
  title,
  sponsors,
}) => {
  const tailwindGray = tailwind('colors.gray');

  const tailwindScreens = tailwind('screens');

  return (
    <Fragment>
      {/* @TODO: Once EmotionJS supports shorthand syntax for React.Fragment, switch <Fragment> out for <> syntax! */}
      <SiteNavigationContainer />

      <main>
        <article data-test="home-page">
          {/* Page Header */}
          <header role="banner" className="bg-white relative">
            <AnalyticsWaypoint
              className="absolute top-0 w-full"
              name="impact_section_top"
            />

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

                ${coverImageMediaQueryStyles(coverImage.url)}
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
                  campaignName="We are The Voters"
                  impactLabel="Voters Registered"
                  impactValue="350,000"
                />

                <ImpactStatistic
                  campaignName="Teens for Jeans"
                  impactLabel="Jeans Donated"
                  impactValue="5 million"
                />

                <ImpactStatistic
                  campaignName="GTFO (Get The Filter Out)"
                  impactLabel="Cigarette Butts Collected"
                  impactValue="3.7 million"
                />
              </div>
            </div>

            <AnalyticsWaypoint
              className="absolute bottom-0 w-full"
              name="impact_section_bottom"
            />
          </header>

          {/* Campaign Gallery Section */}
          {campaigns ? (
            <section
              className="base-12-grid bg-gray-100 py-8 relative"
              css={css`
                background: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1) 25%,
                  ${tailwindGray['100']}
                );
              `}
              data-test="campaigns-section"
            >
              <AnalyticsWaypoint
                className="absolute top-0 w-full"
                name="campaign_section_top"
              />

              <StrikeThroughHeader title="Take Action!" />

              <div className="grid-wide text-center">
                <p className="mb-3 text-lg">
                  Choose a campaign below to make an impact,{' '}
                  <a
                    href="/us/about/easy-scholarships"
                    data-label="campaign_section_earn_scholarships"
                  >
                    win scholarships
                  </a>
                  , and{' '}
                  <a
                    href="/us/about/volunteer-hours"
                    data-label="campaign_section_earn_volunteer_credits"
                  >
                    earn volunteer credits
                  </a>
                  .
                </p>

                <p className="mb-6 lg:mb-8 mt-0 text-lg">
                  Talk about a win-win-win.
                </p>

                {/*
                // @TODO: After volunteer credits launch use this copy for campaigns section:
                <p className="mb-3 text-lg">
                  Choose a campaign below to make an impact{' '}
                  <a
                    href="/us/about/easy-scholarships"
                    className="font-normal text-blurple-500 hover:text-blurple-300 underline hover:no-underline"
                    data-label="campaign_section_earn_scholarships"
                  >
                    win scholarships
                  </a>
                  , and earn volunteer credits for school.
                </p>

                <p className="mb-6 lg:mb-8 mt-0 text-lg">
                  Talk about a win-win-win.
                </p>
                */}

                <CampaignGallery campaigns={campaigns} hasButton hasFeatured />

                <PrimaryButton
                  attributes={{ 'data-label': 'campaign_section_show_more' }}
                  className="mt-8 py-4 px-8 text-lg"
                  href="/us/campaigns"
                  text="See More Campaigns"
                />
              </div>

              <AnalyticsWaypoint
                className="absolute bottom-0 w-full"
                name="campaign_section_bottom"
              />
            </section>
          ) : null}

          {/* Member Benefits Section */}
          <section
            className="base-12-grid bg-purple-700 py-8 lg:py-12"
            data-test="member-benefits-cta"
          >
            <AnalyticsWaypoint
              className="absolute top-0 w-full"
              name="member_benfits_top"
            />

            <div className="grid-wide text-center">
              <h2 className="font-league-gothic font-normal mb-4 tracking-wide text-4xl text-white uppercase">
                DoSomething Member Benfits
              </h2>

              <p className="text-lg text-white">
                Sign up for a{' '}
                <a
                  className="font-normal text-white hover:text-yellow-300 underline hover:no-underline"
                  href="/us/campaigns"
                >
                  campaign
                </a>{' '}
                or{' '}
                <a
                  className="font-normal text-white hover:text-yellow-300 underline hover:no-underline"
                  href="/authorize"
                >
                  create an account
                </a>{' '}
                to officially join our community and gain access to these
                benefits.
              </p>

              <ul className="md:col-gap-8 lg:col-gap-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 row-gap-8">
                <li className="text-white">
                  <BenefitItem
                    content="Make a difference alongside members in every US area code and 131 countries."
                    title="Community Impact"
                    image={MemberBenefitsImages.Community}
                    link={{
                      copy: 'About Our Impact',
                      url: '/us/about',
                    }}
                  />
                </li>

                <li className="text-white">
                  <BenefitItem
                    content="Earn the chance to win scholarships for volunteering. No essay or GPA required. Ever."
                    title="Scholarships"
                    image={MemberBenefitsImages.Scholarships}
                    link={{
                      copy: 'Find Scholarships',
                      url: '/us/about/easy-scholarships',
                    }}
                  />
                </li>

                <li className="text-white">
                  <BenefitItem
                    content="Earn verified volunteer hours by completing DoSomething campaigns."
                    title="Volunteer Credits"
                    image={MemberBenefitsImages.VolunteerCredits}
                    link={{
                      copy: 'About Volunteer Credits',
                      url: '/us/about/volunteer-hours',
                    }}
                  />
                </li>

                <li className="text-white">
                  <BenefitItem
                    content="Find news, inspiring stories, and how-to guides for impacting your community."
                    title="Content"
                    image={MemberBenefitsImages.Content}
                    link={{
                      copy: 'Read More',
                      url: 'https://join.dosomething.org',
                    }}
                  />
                </li>
              </ul>
            </div>

            <AnalyticsWaypoint
              className="absolute bottom-0 w-full"
              name="member_benfits_bottom"
            />
          </section>

          {/* Article Gallery Section */}
          {articles ? (
            <section
              className="base-12-grid bg-gray-100 py-8"
              data-test="articles-section"
            >
              <AnalyticsWaypoint name="article_section_top" />

              <StrikeThroughHeader title="Read About It" />

              <div className="grid-wide text-center">
                <HomePageArticleGallery articles={articles} />

                <PrimaryButton
                  attributes={{ 'data-label': 'article_section_show_more' }}
                  className="mt-8 py-4 px-8 text-lg"
                  href="https://lets.dosomething.org/"
                  text="See More Articles"
                />

                <AnalyticsWaypoint name="article_section_bottom" />
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
              <AnalyticsWaypoint name="sponsor_section_top" />

              <h2 className="font-bold mb-3 text-base text-center text-gray-500 uppercase">
                Sponsors
              </h2>
              <ul>
                {sponsors.map(sponsor => (
                  <li key={sponsor.title} className="inline-block mx-6 my-3">
                    <img
                      className="opacity-25"
                      src={contentfulImageUrl(sponsor.logo.url, '125', '40')}
                      title={sponsor.title}
                      alt={sponsor.title}
                    />
                  </li>
                ))}
              </ul>

              <AnalyticsWaypoint name="sponsor_section_bottom" />
            </div>
          </section>

          {isAuthenticated() ? null : (
            <BannerCallToAction
              text="Make an impact with millions of young people, and earn a chance to win scholarships."
              title="Join our youth-led movement for good"
              waypointName="join cta"
            >
              <PrimaryButton
                attributes={{ 'data-label': 'signup_cta_authorize' }}
                className="mt-8 xl:m-0 py-4 px-16 text-lg xl:ml-auto"
                href="/authorize"
                text="Join Now"
              />
            </BannerCallToAction>
          )}
        </article>
      </main>

      <SiteFooter />
    </Fragment>
  );
};

HomePageTemplate.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  campaigns: PropTypes.arrayOf(PropTypes.object),
  sponsors: PropTypes.arrayOf(PropTypes.object),
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
};

HomePageTemplate.defaultProps = {
  sponsors: null,
  articles: null,
  campaigns: null,
  coverImage: null,
  title: 'We Are A Youth-Led Movement For Good',
};

const HomePage = () => (
  <PageQuery query={HOME_PAGE_QUERY}>
    {page => <HomePageTemplate {...page} />}
  </PageQuery>
);

export default HomePage;
