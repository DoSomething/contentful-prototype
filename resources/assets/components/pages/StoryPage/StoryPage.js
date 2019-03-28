/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import InfoBar from '../../InfoBar/InfoBar';
import ContentfulEntry from '../../ContentfulEntry';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';

import './story-page.scss';

const StoryPage = props => {
  const { blocks, coverImage, subTitle, title } = props;

  const backgroundImage = coverImage
    ? `url(${contentfulImageUrl(coverImage.url, '1440', '610', 'fill')})`
    : null;

  const styles = {
    backgroundImage,
  };

  return (
    <React.Fragment>
      <article className="story-page">
        <header
          role="banner"
          className="lede-banner base-16-grid"
          style={withoutNulls(styles)}
        >
          <div className="wrapper text-center">
            <h1 className="lede-banner__headline-title color-white caps-lock">
              {title}
            </h1>
            {subTitle ? (
              <h2 className="lede-banner__headline-subtitle color-yellow">
                {subTitle}
              </h2>
            ) : null}
          </div>
        </header>

        <SocialShareTray
          shareLink={window.location.href}
          platforms={['facebook', 'twitter']}
        />

        {blocks.map(block => (
          <ContentfulEntry
            className="story-section"
            key={block.id}
            json={block}
          />
        ))}
      </article>

      <InfoBar />
    </React.Fragment>
  );
};

StoryPage.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

StoryPage.defaultProps = {
  blocks: [],
  coverImage: null,
  subTitle: null,
};

export default StoryPage;
