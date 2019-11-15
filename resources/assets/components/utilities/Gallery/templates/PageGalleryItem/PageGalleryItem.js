import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import Card from '../../../Card/Card';
import { Figure } from '../../../Figure/Figure';
import { contentfulImageUrl } from '../../../../../helpers';

const PageGalleryItem = ({
  showcaseTitle,
  showcaseDescription,
  showcaseImage,
  slug,
}) => (
  <Card className="rounded">
    <a className="page-gallery-item block" href={`/us/${slug}`}>
      <Figure
        alt={`${showcaseImage.description || showcaseTitle}-photo`}
        image={contentfulImageUrl(
          get(showcaseImage, 'url'),
          '800',
          '450',
          'fill',
        )}
      >
        <div className="m-3">
          <h4 className="text-blue-500">{showcaseTitle}</h4>
          {showcaseDescription ? (
            <p className="font-normal">{showcaseDescription}</p>
          ) : null}
        </div>
      </Figure>
    </a>
  </Card>
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
