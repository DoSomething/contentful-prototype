import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import Markdown from '../../../utilities/Markdown/Markdown';

const ContentBlockGalleryItem = ({ title, image, content, imageAlignment }) => {
  // Image formatting needs to be smaller if they are left-aligned.
  const imageFormatting = imageAlignment === 'left' ? '100' : '400';
  // Ensure we don't pass the unsupported 'top' as the alignment prop to Figure.
  const alignment = imageAlignment === 'top' ? null : imageAlignment;

  return (
    <Figure
      alt={image.description || `${title}-photo`}
      image={contentfulImageUrl(
        image.url,
        imageFormatting,
        imageFormatting,
        'fill',
      )}
      alignment={alignment}
    >
      <h3>{title}</h3>

      {content ? <Markdown>{content}</Markdown> : null}
    </Figure>
  );
};

ContentBlockGalleryItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  content: PropTypes.string.isRequired,
  imageAlignment: PropTypes.oneOf(['top', 'left']).isRequired,
};

export default ContentBlockGalleryItem;
