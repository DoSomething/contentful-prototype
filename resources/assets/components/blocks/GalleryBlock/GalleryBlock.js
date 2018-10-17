import React from 'react';
import PropTypes from 'prop-types';

import Person from '../../Person/Person';
import Gallery from '../../utilities/Gallery/Gallery';

const renderBlock = block => {
  switch (block.type) {
    case 'person':
      return <Person key={block.id} {...block.fields} />;

    case 'campaign':
      return null;

    default:
      return null;
  }
};

const GalleryBlock = ({ title, blocks }) => (
  <div className="gallery-block">
    {title ? <h1>{title}</h1> : null}

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
