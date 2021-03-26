import { css } from '@emotion/core';
import { Fragment, React } from 'react';

import data from './about-page-content.json';
import Embed from '../../utilities/Embed/Embed';
import { tailwind } from '../../../helpers/display';
import { isAuthenticated } from '../../../helpers/auth';
import LinkButton from '../../utilities/Button/LinkButton';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import { contentfulImageUrl } from '../../../helpers/contentful';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CampaignGallery from '../../utilities/Gallery/CampaignGallery';
import SpotlightGallery from '../../utilities/Gallery/SpotlightGallery';
import BannerCallToAction from '../../utilities/CallToAction/BannerCallToAction';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';
import NewsletterSubscriptionForm from '../../utilities/NewsletterSubscription/NewsletterSubscriptionForm';

const AboutPageTemplate = () => {
  const tailwindScreens = tailwind('screens');

  const headerBackgroundStyles = data.coverImage
    ? css`
        background-image: url(${contentfulImageUrl(
          data.coverImage.url,
          '400',
          '775',
          'fill',
        )});

        @media (min-width: ${tailwindScreens.md}) {
          background-image: url(${contentfulImageUrl(
            data.coverImage.url,
            '700',
            '700',
            'fill',
          )});
        }

        @media (min-width: ${tailwindScreens.lg}) {
          background-image: url(${contentfulImageUrl(
            data.coverImage.url,
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

          {/* Main Content Section */}
          <section className="base-12-grid bg-white py-12">
            <Embed
              className="col-span-4 md:col-span-8 lg:col-span-10 xl:col-span-4 lg:col-start-2 xl:col-start-8 xl:mt-12 xl:row-start-1 self-start"
              url={data.content.media.url}
            />

            <div className="col-span-4 md:col-span-8 lg:col-span-10 xl:col-span-6 lg:col-start-2 xl:col-start-2 xl:row-start-1 mt-4 xl:mt-0">
              <h2 className="mb-0 text-lg text-purple-400 uppercase">
                About Us
              </h2>

              <h3 className="font-league-gothic font-normal mb-0 md:text-4xl mt-4 text-3xl uppercase">
                {data.content.title}
              </h3>

              <p className="mt-8 text-lg">{data.content.copy}</p>
            </div>
          </section>

          {/* Campaign Gallery Section */}
          <section
            className="base-12-grid bg-gray-100 py-12"
            data-test="campaigns-section"
          >
            <AnalyticsWaypoint name="campaign_section_top" />

            <StrikeThroughHeader title="Some Of Our Greatest Campaigns" />

            <div className="grid-wide text-center">
              <CampaignGallery campaigns={data.campaigns} />

              <PrimaryButton
                attributes={{ 'data-label': 'campaign_section_show_more' }}
                className="mt-8 py-4 px-8 text-lg"
                href="/us/campaigns"
                text="See More Campaigns"
              />
            </div>

            <AnalyticsWaypoint name="campaign_section_bottom" />
          </section>

          <BannerCallToAction
            colorClasses={{
              background: 'bg-purple-500',
              text: 'text-teal-500',
            }}
            message="Earn scholarships through community service"
            title="Easy Scholarships"
            stacked
          >
            <PrimaryButton
              attributes={{ 'data-label': 'scholarships_cta_authorize' }}
              className="mt-8 xl:m-0 py-4 px-16 text-lg xl:ml-auto"
              href="/authorize"
              text="See Scholarship Campaigns"
            />
          </BannerCallToAction>

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
                items={data.memberHighlights}
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
                items={data.scholarshipWinners}
              />
            </div>
          </section>

          {/* Join Us Call To Action Banner */}
          {isAuthenticated() ? null : (
            <BannerCallToAction
              title="Join our youth-led movement for good"
              message="Make an impact with millions of young people, and earn a chance to
              win scholarships."
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

AboutPageTemplate.propTypes = {};

AboutPageTemplate.defaultProps = {};

const AboutPage = () => <AboutPageTemplate />;

export default AboutPage;
