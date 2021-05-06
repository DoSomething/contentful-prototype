import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import React, { Fragment } from 'react';

import PageQuery from '../PageQuery';
import { withoutNulls } from '../../../helpers/data';
import LinkButton from '../../utilities/Button/LinkButton';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import PrimaryButton from '../../utilities/Button/PrimaryButton';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';
import { pageCardFragment } from '../../utilities/PageCard/PageCard';
import { coverImageMediaQueryStyles } from '../../../helpers/display';
import BannerCallToAction from '../../utilities/CallToAction/BannerCallToAction';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import StrikeThroughHeader from '../../utilities/SectionHeader/StrikeThroughHeader';
import { EMAIL_SUBSCRIPTION_TOPICS } from '../../utilities/EmailSubscription/config';
import SingleEmailSubscriptionForm from '../../utilities/EmailSubscription/SingleEmailSubscriptionForm';

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
        <article data-testid="articles-page">
          {/* Page Header */}
          <header role="banner" className="bg-gray-100">
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
            data-testid="featured-articles-section-top"
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

          {/* Lifestyle Email Newsletter Signup Section */}
          <section
            className="base-12-grid bg-purple-700 py-12"
            data-testid="newsletter-section-articles-page"
          >
            <div className="grid-wide flex flex-wrap md:flex-no-wrap text-center w-full mb-6 justify-center">
              <h2 className="font-league-gothic font-normal leading-tight px-6 text-3xl md:text-4xl uppercase text-white">
                Want Inspiration & Education Straight to your inbox?
              </h2>
            </div>

            <div className="grid-wide text-center">
              <p className="text-white">
                Sign up for weekly emails of news, videos, how-tos, advice, and
                ways to transform your community.
              </p>

              <SingleEmailSubscriptionForm
                emailSubscriptionTopic={EMAIL_SUBSCRIPTION_TOPICS.lifestyle}
                submissionSourceDetails="lifestyle_newsletter-cta_articles_page"
              />
            </div>
          </section>

          {/* Topic Gallery Section One */}
          {topicArticlesGalleryOneTitle && topicArticlesGalleryOne ? (
            <section
              className="base-12-grid bg-gray-100 py-12"
              data-testid="topic-one-articles-section"
            >
              <StrikeThroughHeader title={topicArticlesGalleryOneTitle} />

              <div className="grid-wide text-center">
                <GalleryBlock
                  blocks={topicArticlesGalleryOne}
                  galleryType="PAGE"
                  itemsPerRow={3}
                  imageAlignment="LEFT"
                />
              </div>
            </section>
          ) : null}

          {/* Topic Gallery Section Two */}
          {topicArticlesGalleryTwoTitle && topicArticlesGalleryTwo ? (
            <section
              className="base-12-grid bg-gray-100 py-12"
              data-testid="topic-two-articles-section"
            >
              <StrikeThroughHeader title={topicArticlesGalleryTwoTitle} />

              <div className="grid-wide text-center">
                <GalleryBlock
                  blocks={topicArticlesGalleryTwo}
                  galleryType="PAGE"
                  itemsPerRow={3}
                  imageAlignment="LEFT"
                />
              </div>
            </section>
          ) : null}

          {/* Featured Gallery Section Bottom */}
          {featuredArticlesGalleryBottomTitle &&
          featuredArticlesGalleryBottom ? (
            <section
              className="base-12-grid bg-gray-100 py-12"
              data-testid="featured-articles-section-bottom"
            >
              <StrikeThroughHeader title={featuredArticlesGalleryBottomTitle} />

              <div className="grid-wide text-center">
                <GalleryBlock
                  blocks={featuredArticlesGalleryBottom}
                  galleryType="PAGE"
                  itemsPerRow={3}
                  imageAlignment="LEFT"
                />
              </div>
            </section>
          ) : null}

          {/* Article Archive Call To Action Banner */}
          <BannerCallToAction text={ctaText} title={ctaTitle} stacked>
            <PrimaryButton
              attributes={{ 'data-label': 'signup_cta_authorize' }}
              className="mt-8 xl:m-0 py-4 px-16 text-lg xl:ml-auto"
              href="/us/about/articles"
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
  headerTitle: PropTypes.string.isRequired,
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
  featuredArticlesGalleryBottom: [],
  headerButtonText: 'Read More',
  topicArticlesGalleryOne: [],
  topicArticlesGalleryOneTitle: null,
  topicArticlesGalleryTwo: [],
  topicArticlesGalleryTwoTitle: null,
};

const ArticlesPage = () => (
  <PageQuery query={ARTICLES_PAGE_QUERY}>
    {page => <ArticlesLandingPage {...withoutNulls(page)} />}
  </PageQuery>
);

export default ArticlesPage;
