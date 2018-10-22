/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Enclosure from '../../Enclosure';
import LazyImage from '../../utilities/LazyImage';
import Byline from '../../utilities/Byline/Byline';
import ContentfulEntry from '../../ContentfulEntry';
import AuthorBio from '../../utilities/Author/AuthorBio';
import Markdown from '../../utilities/Markdown/Markdown';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import AdminDashboardContainer from '../../AdminDashboard/AdminDashboardContainer';
import PageDashboardContainer from '../../AdminDashboard/PageDashboard/PageDashboardContainer';

import './general-page.scss';

/**
 * Render a general page
 *
 * @returns {XML}
 */
const GeneralPage = props => {
  const {
    authors,
    title,
    subTitle,
    coverImage,
    content,
    sidebar,
    blocks,
    displaySocialShare,
  } = props;

  return (
    <div>
      <AdminDashboardContainer>
        <PageDashboardContainer />
      </AdminDashboardContainer>

      <div className="main clearfix general-page">
        <Enclosure className="default-container margin-vertical">
          <div className="general-page__heading text-centered">
            <h1 className="general-page__title caps-lock">{title}</h1>
            {subTitle ? (
              <p className="general-page__subtitle">{subTitle}</p>
            ) : null}

            {authors.length ? (
              <div className="general-page__authors">
                {authors.map(author => (
                  <Byline
                    key={author.id}
                    author={author.fields.name}
                    {...withoutNulls(author.fields)}
                    photo={contentfulImageUrl(
                      author.fields.photo,
                      175,
                      175,
                      'fill',
                    )}
                    className="byline--page-author"
                  />
                ))}
              </div>
            ) : null}
          </div>

          {coverImage.url ? (
            <LazyImage
              className="padding-vertical-md margin-horizontal-auto"
              alt={coverImage.description || 'Page Cover Image'}
              src={contentfulImageUrl(coverImage.url, 1440, 620)}
            />
          ) : null}

          {content ? (
            <div className={classnames({ row: sidebar.length })}>
              <div className="primary">
                <Markdown className="margin-horizontal-md">{content}</Markdown>
              </div>

              {sidebar.length ? (
                <div className="secondary">
                  {sidebar.map(block => (
                    <div className="margin-bottom-lg" key={block.id}>
                      <ContentfulEntry json={block} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          {blocks.map(block => (
            <div className="general-page__block margin-vertical" key={block.id}>
              <ContentfulEntry json={block} />
            </div>
          ))}

          {displaySocialShare ? (
            <SocialShareTray
              shareLink={window.location.href}
              platforms={['facebook', 'twitter']}
              title="found this useful?"
            />
          ) : null}

          {authors.length ? (
            <ul className="general-page__author-bios">
              {authors.map(author => (
                <li className="padding-vertical-md" key={author.id}>
                  <AuthorBio
                    {...withoutNulls(author.fields)}
                    photo={contentfulImageUrl(
                      author.fields.photo,
                      175,
                      175,
                      'fill',
                    )}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </Enclosure>
      </div>
    </div>
  );
};

GeneralPage.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  content: PropTypes.string,
  sidebar: PropTypes.arrayOf(PropTypes.object),
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  displaySocialShare: PropTypes.bool,
};

GeneralPage.defaultProps = {
  authors: [],
  coverImage: {},
  content: null,
  sidebar: [],
  subTitle: null,
  displaySocialShare: false,
};

export default GeneralPage;
