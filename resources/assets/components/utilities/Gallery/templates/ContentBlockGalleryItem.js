import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure/Figure';
import TextContent from '../../TextContent/TextContent';
import { contentfulImageUrl } from '../../../../helpers';

const ContentBlockGalleryItem = ({
  showcaseTitle,
  showcaseImage,
  showcaseDescription,
  imageAlignment,
  imageFit,
}) => {
  const leftAligned = imageAlignment === 'left';
  // Image formatting needs to be smaller if they are left-aligned.
  const imageFormatting = leftAligned ? ['100', '100'] : ['400', '400'];

  // Ensure we don't pass the unsupported 'top' as the alignment prop to Figure.
  // @TODO (11/01/2018) Update this logic once we refactor the Figure component!
  const alignment = leftAligned ? imageAlignment : undefined;

  return (
    <Figure
      alt={showcaseImage.description || `${showcaseTitle}-photo`}
      image={contentfulImageUrl(
        get(showcaseImage, 'url'),
        ...imageFormatting,
        imageFit,
      )}
      alignment={alignment}
    >
      <h4>{showcaseTitle}</h4>

      {showcaseDescription ? (
        <TextContent>{showcaseDescription}</TextContent>
      ) : null}
    </Figure>
  );
};

ContentBlockGalleryItem.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  showcaseDescription: PropTypes.string.isRequired,
  imageAlignment: PropTypes.oneOf(['top', 'left']).isRequired,
  imageFit: PropTypes.oneOf(['fill', 'pad']).isRequired,
};

ContentBlockGalleryItem.defaultProps = {
  showcaseImage: {},
};

export default ContentBlockGalleryItem;
