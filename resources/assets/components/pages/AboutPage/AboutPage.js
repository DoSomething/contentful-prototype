import { css } from '@emotion/core';
import { Fragment, React } from 'react';

import content from './about-page-content.json';
import { tailwind } from '../../../helpers/display';
import { isAuthenticated } from '../../../helpers/auth';
import LinkButton from '../../utilities/Button/LinkButton';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import { contentfulImageUrl } from '../../../helpers/contentful';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CampaignGallery from '../../utilities/Gallery/CampaignGallery';
import SpotlightGallery from '../../utilities/Gallery/SpotlightGallery';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';
import NewsletterSubscriptionForm from '../../utilities/NewsletterSubscription/NewsletterSubscriptionForm';

const AboutPageTemplate = () => {
  const tailwindScreens = tailwind('screens');

  const headerBackgroundStyles = content.coverImage
    ? css`
        background-image: url(${contentfulImageUrl(
          content.coverImage.url,
          '400',
          '775',
          'fill',
        )});

        @media (min-width: ${tailwindScreens.md}) {
          background-image: url(${contentfulImageUrl(
            content.coverImage.url,
            '700',
            '700',
            'fill',
          )});
        }

        @media (min-width: ${tailwindScreens.lg}) {
          background-image: url(${contentfulImageUrl(
            content.coverImage.url,
            '1440',
            '539',
            'fill',
          )});
        }
      `
    : null;

  return (
    <Fragment>
      <SiteNavigationContainer />

      <main>
        <article data-test="join-us-page">
          <header role="banner" className="bg-white">
            <AnalyticsWaypoint name="RENAME_section_top" />

            <div
              className="bg-gray-400"
              css={css`
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                height: 540px;

                ${headerBackgroundStyles}
              `}
            />

            <div
              className="base-12-grid"
              css={css`
                margin-top: -125px;
              `}
            >
              <div
                className="bg-blurple-500 grid-wide p-8 text-center"
                css={css`
                  min-height: 200px;
                `}
              >
                <h1 className="font-league-gothic font-normal mb-0 text-5xl text-teal-500 uppercase">
                  Join Our Youth-Led Movement For Good
                </h1>

                <p className="font-bold text-lg text-white">
                  Make an impact with millions of young people, and earn easy
                  scholarships for volunteering.
                </p>

                <LinkButton
                  className="bg-yellow-400 hover:bg-yellow-100 mt-2 px-6 py-4 text-gray-900 hover:text-gray-900 text-lg"
                  href="/authorize"
                  text="Join Now"
                />
              </div>
            </div>

            <AnalyticsWaypoint name="RENAME_section_bottom" />
          </header>

          {/* Campaign Gallery Section */}
          <section
            className="base-12-grid bg-gray-100 py-12"
            data-test="campaigns-section"
          >
            <AnalyticsWaypoint name="campaign_section_top" />

            <StrikeThroughHeader title="Some Of Our Greatest Campaigns" />

            <div className="grid-wide text-center">
              <CampaignGallery campaigns={content.campaigns} />

              <PrimaryButton
                attributes={{ 'data-label': 'campaign_section_show_more' }}
                className="mt-8 py-4 px-8 text-lg"
                href="/us/campaigns"
                text="See More Campaigns"
              />
            </div>

            <AnalyticsWaypoint name="campaign_section_bottom" />
          </section>

          {/* Newsletter Signup Section */}
          <section
            className="base-12-grid bg-gray-100 py-12"
            data-test="newsletter-section"
          >
            <StrikeThroughHeader title="Get Inspired. Get Entertained. Get Active." />

            <div className="grid-wide text-center">
              <NewsletterSubscriptionForm />
            </div>
          </section>

          {/* Member Highlight Section */}
          <section
            className="base-12-grid bg-white py-12"
            data-test="member-highlight-section"
          >
            <StrikeThroughHeader title="Meet Our Members" />

            <div className="grid-main">
              <p className="text-lg">
                A DoSomething member is any young person who signs up for one of
                our volunteer, social change, or civic action campaigns.
                We&apos;ve got *millions* of members making change in every US
                area code and 131 countries. Get to know some of them!
              </p>
            </div>

            <div className="grid-wide">
              <SpotlightGallery
                type="memberSpotlight"
                className="mt-8 text-center"
                colors={{ background: tailwind('colors.purple.700') }}
                items={content.memberHighlights}
              />
            </div>
          </section>

          {/* Scholarship Winners Section */}
          <section
            className="base-12-grid bg-white py-12"
            data-test="scholarship-winners-section"
          >
            <StrikeThroughHeader title="Scholarship Winners" />

            <div className="grid-wide text-center">
              <SpotlightGallery
                type="memberSpotlight"
                colors={{
                  background: tailwind('colors.blurple.500'),
                  title: tailwind('colors.teal.500'),
                }}
                items={content.scholarshipWinners}
              />
            </div>
          </section>

          {/* Join Us Call To Action Banner */}
          {isAuthenticated() ? null : (
            <article
              className="base-12-grid bg-yellow-500 py-16"
              data-test="signup-cta"
            >
              <div className="xl:flex grid-wide xl:items-center text-center">
                <AnalyticsWaypoint name="join_cta_top" />

                <div className="text-left xl:w-8/12">
                  <h1 className="font-bold text-2xl">
                    Join our youth-led movement for good
                  </h1>
                  <p className="text-lg">
                    Make an impact with millions of young people, and earn a
                    chance to win scholarships.
                  </p>
                </div>

                <div className="flex-grow">
                  <PrimaryButton
                    attributes={{ 'data-label': 'signup_cta_authorize' }}
                    className="mt-8 xl:m-0 py-4 px-16 text-lg xl:ml-auto"
                    href="/authorize"
                    text="Join Now"
                  />
                </div>

                <AnalyticsWaypoint name="join_cta_bottom" />
              </div>
            </article>
          )}
        </article>
      </main>

      <SiteFooter />
    </Fragment>
  );
};

AboutPageTemplate.propTypes = {};

AboutPageTemplate.defaultProps = {};

const AboutPage = () => <AboutPageTemplate />;

export default AboutPage;
