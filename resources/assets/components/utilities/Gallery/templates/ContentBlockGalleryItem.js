import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import Markdown from '../../../utilities/Markdown/Markdown';

const ContentBlockGalleryItem = ({
  title,
  image,
  content,
  imageAlignment,
  imageFit,
}) => {
  // Image formatting needs to be smaller if they are left-aligned.
  const imageFormatting = imageAlignment === 'left' ? '100' : '400';
  // Ensure we don't pass the unsupported 'top' as the alignment prop to Figure.
  // @TODO (11/01/2018) Update this logic once we refactor the Figure component!
  const alignment = imageAlignment === 'top' ? null : imageAlignment;

  return (
    <Figure
      alt={image.description || `${title}-photo`}
      image={contentfulImageUrl(
        image.url,
        imageFormatting,
        imageFormatting,
        imageFit,
      )}
      alignment={alignment}
    >
      <h4>{title}</h4>

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
  imageFit: PropTypes.oneOf(['fill', 'pad']).isRequired,
};

export default ContentBlockGalleryItem;
