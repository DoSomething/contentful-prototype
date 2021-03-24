import { Fragment, React } from 'react';

import data from './about-page-content.json';
import Embed from '../../utilities/Embed/Embed';
import { tailwind } from '../../../helpers/display';
import { isAuthenticated } from '../../../helpers/auth';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CampaignGallery from '../../utilities/Gallery/CampaignGallery';
import SpotlightGallery from '../../utilities/Gallery/SpotlightGallery';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';
import NewsletterSubscriptionForm from '../../utilities/NewsletterSubscription/NewsletterSubscriptionForm';

const AboutPageTemplate = () => {
  return (
    <Fragment>
      <SiteNavigationContainer />

      <main>
        <article data-test="join-us-page">
          <header role="banner" className="bg-white">
            <AnalyticsWaypoint name="RENAME_section_top" />

            <div>Hello!</div>

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
