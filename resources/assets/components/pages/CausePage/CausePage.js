import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../../utilities/TextContent/TextContent';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

import './cause-page.scss';

const CausePage = ({ coverImage, superTitle, title, description, content }) => {
  // @TODO: Update this with image dimension logic to serve properly sized files to different screen sizes
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
            <h1 className="lede-banner__headline-title my-4 font-normal font-league-gothic color-white caps-lock">
              {title}
            </h1>
            <TextContent styles={{ textColor: '#FFF', fontSize: '21px' }}>
              {description}
            </TextContent>
          </div>
        </header>
        <TextContent
          className="base-12-grid"
          classNameByEntry={{
            GalleryBlock: 'grid-full',
            ContentBlock: 'grid-full-8/12',
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
