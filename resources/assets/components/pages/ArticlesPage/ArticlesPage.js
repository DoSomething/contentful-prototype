import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import React, { Fragment } from 'react';

import PageQuery from '../PageQuery';
import LinkButton from '../../utilities/Button/LinkButton';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';
import { pageCardFragment } from '../../utilities/PageCard/PageCard';
import { coverImageMediaQueryStyles } from '../../../helpers/display';
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

const ArticlesLandingPage = ({
  coverImage,
  headerTitle,
  headerLinkUrl,
  headerButtonText,
  featuredArticlesGalleryTopTitle,
  featuredArticlesGalleryTop,
  topicArticlesGalleryOneTitle,
  topicArticlesGalleryOne,
  topicArticlesGalleryTwoTitle,
  topicArticlesGalleryTwo,
  featuredArticlesGalleryBottomTitle,
  featuredArticlesGalleryBottom,
  ctaTitle,
  ctaText,
  ctaButtonText,
}) => {
  return (
    <Fragment>
      <SiteNavigationContainer />
      <main>
        <article data-test="articles-page">
          {/* Page Header */}
          <header role="banner" className="bg-white">
            <div
              className="bg-gray-400"
              css={css`
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                height: 540px;

                ${coverImageMediaQueryStyles(coverImage.url)}
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
                  {headerTitle}
                </h1>

                <LinkButton
                  className="bg-yellow-400 hover:bg-yellow-100 mt-2 px-6 py-4 text-gray-900 hover:text-gray-900 text-lg"
                  href={headerLinkUrl}
                  text={headerButtonText}
                />
              </div>
            </div>
          </header>

          {/* Featured Gallery Section Top */}
          <section
            className="base-12-grid bg-gray-100 py-12"
            data-test="campaigns-section"
          >
            <StrikeThroughHeader title={featuredArticlesGalleryTopTitle} />

            <div className="grid-wide text-center">
              <GalleryBlock
                blocks={featuredArticlesGalleryTop || []}
                galleryType="PAGE"
                itemsPerRow={3}
                imageAlignment="LEFT"
              />
            </div>
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

          {/* Topic Gallery Section One */}
          <section
            className="base-12-grid bg-gray-100 py-12"
            data-test="campaigns-section"
          >
            <StrikeThroughHeader title={topicArticlesGalleryOneTitle} />

            <div className="grid-wide text-center">
              <GalleryBlock
                blocks={topicArticlesGalleryOne || []}
                galleryType="PAGE"
                itemsPerRow={3}
                imageAlignment="LEFT"
              />
            </div>
          </section>

          {/* Topic Gallery Section Two */}
          <section
            className="base-12-grid bg-gray-100 py-12"
            data-test="campaigns-section"
          >
            <StrikeThroughHeader title={topicArticlesGalleryTwoTitle} />

            <div className="grid-wide text-center">
              <GalleryBlock
                blocks={topicArticlesGalleryTwo || []}
                galleryType="PAGE"
                itemsPerRow={3}
                imageAlignment="LEFT"
              />
            </div>
          </section>

          {/* Featured Gallery Section Bottom */}
          <section
            className="base-12-grid bg-gray-100 py-12"
            data-test="campaigns-section"
          >
            <StrikeThroughHeader title={featuredArticlesGalleryBottomTitle} />

            <div className="grid-wide text-center">
              <GalleryBlock
                blocks={featuredArticlesGalleryBottom || []}
                galleryType="PAGE"
                itemsPerRow={3}
                imageAlignment="LEFT"
              />
            </div>
          </section>

          {/* Article Archive Call To Action Banner */}
          <BannerCallToAction text={ctaText} title={ctaTitle}>
            <PrimaryButton
              attributes={{ 'data-label': 'signup_cta_authorize' }}
              className="mt-8 xl:m-0 py-4 px-16 text-lg xl:ml-auto"
              href="/us"
              text={ctaButtonText}
            />
          </BannerCallToAction>
        </article>
      </main>
      <SiteFooter />
    </Fragment>
  );
};

ArticlesLandingPage.propTypes = {
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
  ctaButtonText: PropTypes.string,
  ctaText: PropTypes.string,
  ctaTitle: PropTypes.string,
  featuredArticlesGalleryTopTitle: PropTypes.string.isRequired,
  featuredArticlesGalleryTop: PropTypes.arrayOf(PropTypes.object).isRequired,
  featuredArticlesGalleryBottomTitle: PropTypes.string,
  featuredArticlesGalleryBottom: PropTypes.arrayOf(PropTypes.object),
  headerTitle: PropTypes.string,
  headerLinkUrl: PropTypes.string.isRequired,
  headerButtonText: PropTypes.string,
  topicArticlesGalleryOneTitle: PropTypes.string,
  topicArticlesGalleryOne: PropTypes.arrayOf(PropTypes.object),
  topicArticlesGalleryTwoTitle: PropTypes.string,
  topicArticlesGalleryTwo: PropTypes.arrayOf(PropTypes.object),
};

ArticlesLandingPage.defaultProps = {
  coverImage: null,
  ctaButtonText: 'View More Stories',
  ctaText: 'An index of all articles and videos by DoSomething.org',
  ctaTitle: 'Article Archive',
  featuredArticlesGalleryBottomTitle: null,
  featuredArticlesGalleryBottom: null,
  headerTitle: null,
  headerButtonText: 'Read More',
  topicArticlesGalleryOne: null,
  topicArticlesGalleryOneTitle: null,
  topicArticlesGalleryTwo: null,
  topicArticlesGalleryTwoTitle: null,
};

const ArticlesPage = () => (
  <PageQuery query={ARTICLES_PAGE_QUERY}>
    {page => <ArticlesLandingPage {...page} />}
  </PageQuery>
);

export default ArticlesPage;
