/* global window */

import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { withoutNulls } from '../../../helpers';
import LazyImage from '../../utilities/LazyImage';
import Byline from '../../utilities/Byline/Byline';
import { REGISTER_CTA_COPY } from '../../../constants';
import AuthorBio from '../../utilities/Author/AuthorBio';
import ArticleHeader from '../../utilities/ArticleHeader';
import CtaBanner from '../../utilities/CtaBanner/CtaBanner';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import { contentfulImageUrl } from '../../../helpers/contentful';
import TextContent from '../../utilities/TextContent/TextContent';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

/**
 * Render a general page
 *
 * @returns {XML}
 */
const GeneralPage = props => {
  const {
    slug,
    authors,
    title,
    subTitle,
    coverImage,
    content,
    blocks,
    displaySocialShare,
    isAuthenticated,
    authUrl,
  } = props;

  // Grab the CTA copy based on the current page category.
  const pageCategory = slug.split('/')[0];
  const ctaCopy = REGISTER_CTA_COPY[pageCategory];

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <article className="general-page base-12-grid bg-white py-3 md:py-6">
          <div className="grid-narrow">
            <ArticleHeader title={title} subtitle={subTitle}>
              {authors.length ? (
                <div className="inline-block text-left">
                  {authors.map(author => (
                    <Byline
                      key={author.id}
                      author={author.fields.name}
                      {...withoutNulls(author.fields)}
                      photo={contentfulImageUrl(
                        get(author, 'fields.photo.url'),
                        175,
                        175,
                        'fill',
                      )}
                      className="byline--page-author"
                    />
                  ))}
                </div>
              ) : null}
            </ArticleHeader>

            {coverImage.url ? (
              <LazyImage
                className="py-3 mx-auto"
                alt={coverImage.description || 'Page Cover Image'}
                src={contentfulImageUrl(coverImage.url, 1440, 620)}
              />
            ) : null}

            {content ? <TextContent>{content}</TextContent> : null}

            {blocks.map(block => (
              <div className="general-page__block my-6" key={block.id}>
                <ContentfulEntryLoader
                  id={block.id}
                  customProps={{ ContentBlock: { fullWidth: true } }}
                />
              </div>
            ))}

            {displaySocialShare ? (
              <SocialShareTray
                className="text-center"
                shareLink={window.location.href}
                platforms={['facebook', 'twitter']}
                title="found this useful?"
                responsive
              />
            ) : null}

            {authors.length ? (
              <ul className="border-t-2 border-solid border-gray-300 py-3">
                {authors.map(author => (
                  <li className="py-3" key={author.id}>
                    <AuthorBio
                      {...withoutNulls(author.fields)}
                      photo={contentfulImageUrl(
                        get(author, 'fields.photo.url'),
                        175,
                        175,
                        'fill',
                      )}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>

        {ctaCopy && !isAuthenticated ? (
          <CtaBanner
            title={ctaCopy.title}
            content={ctaCopy.content}
            link={authUrl}
            buttonText={ctaCopy.buttonText}
          />
        ) : null}
      </main>

      <SiteFooter />
    </>
  );
};

GeneralPage.propTypes = {
  slug: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  content: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  displaySocialShare: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  authUrl: PropTypes.string.isRequired,
};

GeneralPage.defaultProps = {
  authors: [],
  coverImage: {},
  content: null,
  subTitle: null,
  displaySocialShare: false,
};

export default GeneralPage;
