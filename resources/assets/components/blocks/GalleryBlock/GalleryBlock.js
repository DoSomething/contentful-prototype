import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
import Gallery from '../../utilities/Gallery/Gallery';
import { contentfulImageUrl } from '../../../helpers';

const renderBlock = block => {
  let imageUrl;
  let text;

  switch (block.type) {
    case 'person':
      imageUrl = block.fields.photo;
      text = block.fields.name;
      break;

    case 'campaign':
      imageUrl = block.coverImage.url;
      text = block.title;
      break;

    default:
      return null;
  }

  return (
    <Figure
      key={block.id}
      alt={`${block.type}-${text}`}
      image={contentfulImageUrl(imageUrl, '400', '400', 'fill')}
    >
      <p className="league-gothic">{text}</p>
    </Figure>
  );
};

const GalleryBlock = ({ title, blocks }) => (
  <div className="gallery-block">
    {title ? <h1 className="text-centered">{title}</h1> : null}

    <Gallery type="triad">{blocks.map(renderBlock)}</Gallery>
  </div>
);

GalleryBlock.propTypes = {
  title: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GalleryBlock.defaultProps = {
  title: null,
};

export default GalleryBlock;
