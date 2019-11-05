import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure/Figure';
import { contentfulImageUrl } from '../../../../../helpers';

const PageGalleryItem = ({
  showcaseTitle,
  showcaseDescription,
  showcaseImage,
  slug,
}) => (
  <a className="page-gallery-item block" href={`/us/${slug}`}>
    <Figure
      alt={`${showcaseImage.description || showcaseTitle}-photo`}
      image={contentfulImageUrl(showcaseImage.url, '400', '400', 'fill')}
    >
      <h4>{showcaseTitle}</h4>
      {showcaseDescription ? (
        <p className="font-normal">{showcaseDescription}</p>
      ) : null}
    </Figure>
  </a>
);

PageGalleryItem.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseDescription: PropTypes.string,
  showcaseImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  slug: PropTypes.string.isRequired,
};

PageGalleryItem.defaultProps = {
  showcaseDescription: null,
  showcaseImage: {},
};

export default PageGalleryItem;
