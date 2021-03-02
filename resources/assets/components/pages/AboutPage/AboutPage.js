import { Fragment, React } from 'react';

import content from './about-page-content.json';
import { isAuthenticated } from '../../../helpers/auth';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import CampaignGallery from '../../utilities/Gallery/CampaignGallery';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import AnalyticsWaypoint from '../../utilities/AnalyticsWaypoint/AnalyticsWaypoint';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';

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

          <section
            className="base-12-grid bg-gray-100 py-8"
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
