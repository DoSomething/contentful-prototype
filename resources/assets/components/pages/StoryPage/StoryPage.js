import React from 'react';
import PropTypes from 'prop-types';

import ContentfulEntry from '../../ContentfulEntry';
import { contentfulImageUrl, withoutNulls } from '../../../helpers';

import './story-page.scss';

const StoryPage = props => {
  const { blocks, coverImage, subTitle, title } = props;

  const backgroundImage = coverImage
    ? `url(${contentfulImageUrl(coverImage.url, '1440', '610', 'fill')})`
    : null;

  const styles = {
    backgroundImage,
  };

  console.log(styles);

  return (
    <article className="story-page">
      <header
        role="banner"
        className="lede-banner"
        style={withoutNulls(styles)}
      >
        <wrapper className="text-center">
          <h1 className="lede-banner__headline-title color-white caps-lock">
            {title}
          </h1>
          {subTitle ? <h2 className="color-yellow">{subTitle}</h2> : null}
        </wrapper>
      </header>

      {blocks.map(block => (
        <ContentfulEntry key={block.id} json={block} />
      ))}
    </article>
  );
};

StoryPage.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    descsription: PropTypes.string,
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
