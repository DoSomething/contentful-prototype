/* global window */

import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import LazyImage from '../../utilities/LazyImage';
import Byline from '../../utilities/Byline/Byline';
import { REGISTER_CTA_COPY } from '../../../constants';
import AuthorBio from '../../utilities/Author/AuthorBio';
import ArticleHeader from '../../utilities/ArticleHeader';
import CtaBanner from '../../utilities/CtaBanner/CtaBanner';
import CtaPopover from '../../utilities/CtaPopover/CtaPopover';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import DelayedElement from '../../utilities/DelayedElement/DelayedElement';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import CtaPopoverEmailForm from '../../utilities/CtaPopover/CtaPopoverEmailForm';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import DismissableElement from '../../utilities/DismissableElement/DismissableElement';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

import './general-page.scss';

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
    additionalContent,
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
                <ContentfulEntryLoader id={block.id} />
              </div>
            ))}

            {displaySocialShare ? (
              <SocialShareTray
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
        {get(
          additionalContent,
          'display_scholarship_newsletter_cta_popover',
          false,
        ) === true ? (
          <DismissableElement
            name="cta_popover_scholarship_email"
            context={{ contextSource: 'newsletter_scholarships' }}
            render={(handleClose, handleComplete) => (
              <DelayedElement delay={3}>
                <CtaPopover
                  title="PAYS TO DO GOOD"
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
  additionalContent: PropTypes.object,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  displaySocialShare: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  authUrl: PropTypes.string.isRequired,
};

GeneralPage.defaultProps = {
  authors: [],
  coverImage: {},
  content: null,
  additionalContent: {},
  subTitle: null,
  displaySocialShare: false,
};

export default GeneralPage;
