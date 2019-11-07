import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

import './cause-page.scss';

const CausePage = ({ coverImage, superTitle, title, description, content }) => {
  const backgroundImage = coverImage
    ? `url(${contentfulImageUrl(coverImage.url, '1440', '610', 'fill')})`
    : null;

  const styles = {
    backgroundImage,
  };

  return (
    <>
      <SiteNavigationContainer />

      <article className="cause-page">
        <header
          role="banner"
          className="lede-banner base-12-grid"
          style={withoutNulls(styles)}
        >
          <div className="title-lockup my-8">
            <h2 className="my-4 uppercase color-white text-lg">{superTitle}</h2>
            <h1 className="lede-banner__headline-title my-4 font-normal font-secondary color-white caps-lock">
              {title}
            </h1>
            <TextContent styles={{ textColor: '#FFF' }}>
              {/* @TODO: update font size of discription */}
              {description}
            </TextContent>
          </div>
        </header>
        <TextContent
          className="base-12-grid"
          classNameByEntry={{
            GalleryBlock: 'grid-full',
          }}
        >
          {content}
        </TextContent>
      </article>
    </>
  );
};

CausePage.propTypes = {
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  superTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
};

export default CausePage;
