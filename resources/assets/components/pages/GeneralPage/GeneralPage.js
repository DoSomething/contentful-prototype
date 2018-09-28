/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Enclosure from '../../Enclosure';
import Byline from '../../utilities/Byline/Byline';
import ContentfulEntry from '../../ContentfulEntry';
import AuthorBio from '../../utilities/Author/AuthorBio';
import Markdown from '../../utilities/Markdown/Markdown';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';

import './general-page.scss';

/**
 * Render a general page
 *
 * @returns {XML}
 */
const GeneralPage = props => {
  const { authors, title, subTitle, content, sidebar, blocks } = props;

  return (
    <div>
      <div className="main clearfix general-page">
        <Enclosure className="default-container margin-vertical">
          <div className="general-page__heading text-centered">
            <h1 className="general-page__title caps-lock">{title}</h1>
            {subTitle ? (
              <p className="general-page__subtitle">{subTitle}</p>
            ) : null}

            {authors ? (
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

          <SocialShareTray
            shareLink={window.location.href}
            platforms={['facebook', 'twitter']}
            title="found this useful?"
          />

          {authors ? (
            <ul className="general-page__author-bios">
              {authors.map(author => (
                <li className="padding-vertical-md">
                  <AuthorBio
                    key={author.id}
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
  content: PropTypes.string,
  sidebar: PropTypes.arrayOf(PropTypes.object),
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GeneralPage.defaultProps = {
  authors: [],
  content: null,
  sidebar: [],
  subTitle: null,
};

export default GeneralPage;
