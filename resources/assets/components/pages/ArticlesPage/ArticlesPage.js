import gql from 'graphql-tag';
// import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import React, { Fragment } from 'react';

import PageQuery from '../PageQuery';
import LinkButton from '../../utilities/Button/LinkButton';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import { pageCardFragment } from '../../utilities/PageCard/PageCard';
import BannerCallToAction from '../../utilities/CallToAction/BannerCallToAction';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';
import NewsletterSubscriptionForm from '../../utilities/NewsletterSubscription/NewsletterSubscriptionForm';

const ARTICLES_PAGE_QUERY = gql`
  query ArticlesPageQuery($preview: Boolean) {
    page: articlesPage(preview: $preview) {
      id
      coverImage {
        url
      }
      headerTitle
      headerLinkUrl
      headerButtonText
      featuredArticlesGalleryTopTitle
      featuredArticlesGalleryTop {
        ...PageCard
      }
      topicArticlesGalleryOneTitle
      topicArticlesGalleryOne {
        ...PageCard
      }
      topicArticlesGalleryTwoTitle
      topicArticlesGalleryTwo {
        ...PageCard
      }
      featuredArticlesGalleryBottomTitle
      featuredArticlesGalleryBottom {
        ...PageCard
      }
      ctaTitle
      ctaText
      ctaButtonText
      additionalContent
    }
  }
  ${pageCardFragment}
`;

const ArticlesLandingPage = props => {
  console.log(props);
  return (
    <Fragment>
      <SiteNavigationContainer />
      <main>
        <article data-testId="articles-page">
          {/* Page Header */}
          <header role="banner" className="bg-white">
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
                  This will be the Header Title
                </h1>

                <LinkButton
                  className="bg-yellow-400 hover:bg-yellow-100 mt-2 px-6 py-4 text-gray-900 hover:text-gray-900 text-lg"
                  href="/authorize"
                  text="Join Now"
                />
              </div>
            </div>
          </header>

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

          {/* Article Archive Call To Action Banner */}
          <BannerCallToAction
            text="An index of all articles and videos by DoSomething.org"
            title="Article Archive"
          >
            <PrimaryButton
              attributes={{ 'data-label': 'signup_cta_authorize' }}
              className="mt-8 xl:m-0 py-4 px-16 text-lg xl:ml-auto"
              href="/authorize"
              text="View More Stories"
            />
          </BannerCallToAction>
        </article>
      </main>
      <SiteFooter />
    </Fragment>
  );
};

// ArticlesLandingPage.propTypes = {
//   page: PropTypes.object.isRequired,
// };

const ArticlesPage = () => (
  <PageQuery query={ARTICLES_PAGE_QUERY}>
    {page => <ArticlesLandingPage {...page} />}
  </PageQuery>
);

export default ArticlesPage;
