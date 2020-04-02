import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import PageQuery from '../PageQuery';
import LazyImage from '../../utilities/LazyImage';
import PhotoBanner from '../../blocks/PhotoBanner/PhotoBanner';
import CtaPopover from '../../utilities/CtaPopover/CtaPopover';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import DelayedElement from '../../utilities/DelayedElement/DelayedElement';
import CtaPopoverEmailForm from '../../utilities/CtaPopover/CtaPopoverEmailForm';
import CallToActionBlock from '../../blocks/CallToActionBlock/CallToActionBlock';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import DismissableElement from '../../utilities/DismissableElement/DismissableElement';
import ScholarshipFeatureBlock from '../../blocks/ScholarshipFeatureBlock/ScholarshipFeatureBlock';

export const COMPANY_PAGE_QUERY = gql`
  query CompanyPageQuery($slug: String!, $preview: Boolean!) {
    page: companyPageBySlug(slug: $slug, preview: $preview) {
      slug
      coverImage {
        url
        description
      }
      title
      subTitle
      content
    }
  }
`;

const CompanyPageTemplate = props => {
  const { title, subTitle, slug, coverImage, content } = props;

  return (
    <>
      <SiteNavigationContainer />

      <PhotoBanner title={title} />

      <main className="wrapper base-12-grid bg-white">
        <article className="grid-wide bg-white overflow-hidden">
          {coverImage.url ? (
            <LazyImage
              className="w-full"
              alt={coverImage.description || 'Page Cover Image'}
              src={contentfulImageUrl(coverImage.url, 1440, 620)}
            />
          ) : null}
          <div className="">
            {/* <h1 className="font-league-gothic uppercase text-3xl md:text-5xl">
              {title}
            </h1> */}

            {subTitle ? <h2 className="text-lg my-3">{subTitle}</h2> : null}

            <TextContent className="pt-4 w-3/4">{content}</TextContent>

            {/* DELETE EVERYTHING BELOW THIS LATER */}

            <div className="pt-6">
              <div className="flex__cell -two-thirds section-header w-full">
                <h1 className="section-header__title font-normal font-league-gothic uppercase text-4xl -underlined pb-3">
                  <span>Got 5 minutes? </span>
                </h1>
              </div>
            </div>
            <div className="gallery-grid-triad mb-4">
              <ScholarshipFeatureBlock
                title="COVID-19 Response"
                description="Don't let COVID-19 stop you from changing the world."
                deadline="April 15, 2020"
                amount="$500"
              />
            </div>

            <div className="pt-6">
              <div className="flex__cell -two-thirds section-header w-full">
                <h1 className="section-header__title font-normal font-league-gothic uppercase text-4xl -underlined pb-3">
                  <span>April Scholarships</span>
                </h1>
              </div>
            </div>
            <div className="gallery-grid-triad my-4">
              <ScholarshipFeatureBlock
                title="New State of Mind"
                description="Share your tips on how you manage stress!"
                deadline="April 30, 2020"
                amount="$1,000"
              />
              <ScholarshipFeatureBlock
                title="Ready to Vote? Quiz"
                description="Take and share our online quiz with friends to educate them on everything they need to know to vote in the upcoming elections."
                deadline="April 15, 2020"
                amount="$1000"
              />
              <ScholarshipFeatureBlock
                title="Run an Online Voter Registration Drive"
                description="Share a link to help your friends register to vote online!"
                deadline="April 30, 2020"
                amount="$1,500"
              />
              <ScholarshipFeatureBlock
                title="Would You Rather?"
                description="Take our Would You Rather-style quiz and and share a personal finance guide with a friend."
                deadline="April 30, 2020"
                amount="$2,500"
              />
              <ScholarshipFeatureBlock
                title="COVID-19 Response"
                description="Don't let COVID-19 stop you from changing the world."
                deadline="April 15, 2020"
                amount="$500"
              />
            </div>
            <div className="pb-6">
              <div className="flex__cell -two-thirds section-header w-full">
                <h1 className="section-header__title font-normal font-league-gothic uppercase text-4xl -underlined pb-3">
                  <span>How It Works</span>
                </h1>
              </div>
              <div className="md:grid grid-flow-row-dense grid-cols-3 gap-4">
                <div className="col-span-2 order-1 hack-article-content-widths">
                  <div className="markdown with-lists text-content">
                    <ol>
                      <li>Sign up for a campaign.</li>
                      <li>
                        Complete the campaign (some take 5 minutes or less!).
                      </li>
                      <li>
                        Upload a photo to show you completed the campaign.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-6">
              <div className="flex__cell -two-thirds section-header w-full">
                <h1 className="section-header__title font-normal font-league-gothic uppercase text-4xl -underlined pb-3">
                  <span>Testimonial</span>
                </h1>
              </div>
              <div className="md:grid grid-flow-row-dense grid-cols-3 gap-4">
                <div className="mb-3 col-span-1 order-2">
                  <img
                    className="css-0"
                    alt="content-block"
                    src="https://images.ctfassets.net/81iqaqpfd8fy/29nc8yX9XO7K53lVfA6dmy/7c7e63e9b11fe347af99393ff22890ae/Screen_Shot_2019-04-15_at_5.53.16_PM.png?f=center&amp;fit=fill&amp;h=600&amp;w=600"
                  />
                </div>
                <div className="col-span-2 order-1">
                  <div className="markdown with-lists text-content">
                    <p>
                      <strong>
                        Ricardo won $2,000 for{' '}
                        <a href="https://www.dosomething.org/us/campaigns/prom-for-all">
                          Take Back the Prom: Outfit Donations
                        </a>
                      </strong>
                    </p>
                    <p>
                      “This campaign is important to me because I believe that
                      everyone should be able to have an amazing prom filled
                      with great memories. I was so happy to be able to give
                      someone the opportunity to experience one of the biggest
                      highlights of high school. I have always believed that if
                      you are capable of helping others you should always try
                      your best to do it. I would like to thank everyone at
                      DoSomething for creating and endorsing these admirable
                      campaigns that actually help people.”
                    </p>
                    <p>
                      <em>
                        <a href="https://www.dosomething.org/us/articles/april-scholarship-winners">
                          Meet more DoSomething scholarship winners here!
                        </a>
                      </em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-6">
              <div className="md:grid grid-flow-row-dense grid-cols-3 gap-4">
                <div className="col-span-2 order-1 hack-article-content-widths">
                  <div className="markdown with-lists text-content">
                    <h3>How winners are selected.</h3>
                    <p>
                      Our scholarship winners are selected through a random
                      drawing. Winners of each campaign will typically be
                      announced 3 to 4 weeks after the close of the campaign and
                      notified via text message or email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-6">
              <div className="md:grid grid-flow-row-dense grid-cols-3 gap-4">
                <div className="col-span-2 order-1 hack-article-content-widths">
                  <div className="markdown with-lists text-content">
                    <h3 id="heading--fa-qs">FAQs.</h3>
                    <p>
                      Still have Scholarship questions? No problem! Check out
                      our{' '}
                      <a
                        href="https://help.dosomething.org/hc/en-us/categories/201026747-Scholarships"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Help Center
                      </a>{' '}
                      for more information on eligibility and rules!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* END OF CUSTOM STUFF */}
          </div>
        </article>

        {slug === 'easy-scholarships' ? (
          <DismissableElement
            name="cta_popover_scholarship_email"
            context={{ contextSource: 'newsletter_scholarships' }}
            render={(handleClose, handleComplete) => (
              <DelayedElement delay={3}>
                <CtaPopover
                  title="Pays To Do Good"
                  content="Want to earn easy scholarships for volunteering?
                Subscribe to DoSomething's monthly scholarship email."
                  handleClose={handleClose}
                >
                  <CtaPopoverEmailForm handleComplete={handleComplete} />
                </CtaPopover>
              </DelayedElement>
            )}
          />
        ) : null}
      </main>

      <CallToActionBlock
        supertitle="STAY INFORMED"
        title="PAYS TO DO GOOD"
        text="Get alerts on new ways to earn scholarships by doing social good, plus announcements of scholarship winners."
        classes="bg-purple-700"
      />

      <SiteFooter />
    </>
  );
};

CompanyPageTemplate.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  content: PropTypes.object,
};

CompanyPageTemplate.defaultProps = {
  coverImage: {},
  content: null,
  subTitle: null,
};

const CompanyPage = ({ slug }) => (
  <PageQuery query={COMPANY_PAGE_QUERY} variables={{ slug }}>
    {page => <CompanyPageTemplate {...withoutNulls(page)} />}
  </PageQuery>
);

CompanyPage.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CompanyPage;
