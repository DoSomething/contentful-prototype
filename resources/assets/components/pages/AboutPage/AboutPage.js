import { css } from '@emotion/core';
import { Fragment, React } from 'react';

import data from './about-page-content.json';
import Embed from '../../utilities/Embed/Embed';
import { isAuthenticated } from '../../../helpers/auth';
import LinkButton from '../../utilities/Button/LinkButton';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CampaignGallery from '../../utilities/Gallery/CampaignGallery';
import SpotlightGallery from '../../utilities/Gallery/SpotlightGallery';
import { coverImageMediaQueryStyles, tailwind } from '../../../helpers/display';
import BannerCallToAction from '../../utilities/CallToAction/BannerCallToAction';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';
import NewsletterSubscriptionForm from '../../utilities/NewsletterSubscription/NewsletterSubscriptionForm';

const AboutPageTemplate = () => (
  <Fragment>
    <SiteNavigationContainer />

    <main>
      <article data-test="join-us-page">
        {/* Page Header */}
        <header role="banner" className="bg-white">
          <AnalyticsWaypoint name="RENAME_section_top" />

          <div
            className="bg-gray-400"
            css={css`
              background-position: center center;
              background-repeat: no-repeat;
              background-size: cover;
              height: 540px;

              ${coverImageMediaQueryStyles(data.header.coverImage.url)}
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
                {data.header.title}
              </h1>

              <p className="font-bold text-lg text-white">{data.header.text}</p>

              <LinkButton
                className="bg-yellow-400 hover:bg-yellow-100 mt-2 px-6 py-4 text-gray-900 hover:text-gray-900 text-lg"
                href="/authorize"
                text="Join Now"
              />
            </div>
          </div>

          <AnalyticsWaypoint name="RENAME_section_bottom" />
        </header>

        {/* Introduction Section */}
        <section className="base-12-grid bg-white py-12">
          <Embed
            className="col-span-4 md:col-span-8 lg:col-span-10 xl:col-span-4 lg:col-start-2 xl:col-start-8 xl:mt-12 xl:row-start-1 self-start"
            url={data.introduction.media.url}
          />

          <div className="col-span-4 md:col-span-8 lg:col-span-10 xl:col-span-6 lg:col-start-2 xl:col-start-2 xl:row-start-1 mt-4 xl:mt-0">
            <h2 className="mb-0 text-lg text-purple-400 uppercase">About Us</h2>

            <h3 className="font-league-gothic font-normal mb-0 md:text-4xl mt-4 text-3xl uppercase">
              {data.introduction.title}
            </h3>

            <p className="mt-8 text-lg">{data.introduction.copy}</p>
          </div>
        </section>

        {/* Campaign Gallery Section */}
        <section
          className="base-12-grid bg-gray-100 py-12"
          data-test="campaigns-section"
        >
          <AnalyticsWaypoint name="campaign_section_top" />

          <StrikeThroughHeader title={data.campaignGallery.title} />

          <div className="grid-wide text-center">
            <CampaignGallery campaigns={data.campaignGallery.campaigns} />

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
          text="Earn scholarships through community service"
          title="Easy Scholarships"
          stacked
        >
          <PrimaryButton
            attributes={{ 'data-label': 'scholarships_cta_authorize' }}
            className="mt-4 md:mt-8 py-4 px-16 text-lg"
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
          <StrikeThroughHeader title={data.memberHighlights.title} />

          <div className="grid-main">
            <p className="text-lg">{data.memberHighlights.text}</p>
          </div>

          <div className="grid-wide">
            <SpotlightGallery
              type="memberSpotlight"
              className="mt-8 text-center"
              colors={{ background: tailwind('colors.purple.700') }}
              items={data.memberHighlights.members}
            />
          </div>
        </section>

        {/* Scholarship Winners Section */}
        <section
          className="base-12-grid bg-white py-12"
          data-test="scholarship-winners-section"
        >
          <StrikeThroughHeader title={data.scholarshipWinners.title} />

          <div className="grid-wide text-center">
            <SpotlightGallery
              type="memberSpotlight"
              colors={{
                background: tailwind('colors.blurple.500'),
                title: tailwind('colors.teal.500'),
              }}
              items={data.scholarshipWinners.members}
            />
          </div>
        </section>

        {/* Join Us Call To Action Banner */}
        {isAuthenticated() ? null : (
          <BannerCallToAction
            text="Make an impact with millions of young people, and earn a chance to win scholarships."
            title="Join our youth-led movement for good"
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

AboutPageTemplate.propTypes = {};

AboutPageTemplate.defaultProps = {};

const AboutPage = () => <AboutPageTemplate />;

export default AboutPage;
