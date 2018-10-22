import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../Figure';
import { contentfulImageUrl } from '../../helpers';

const PageGalleryItem = ({ title, subTitle, coverImage, slug }) => (
  <Figure
    alt={`${coverImage.description || title}-photo`}
    image={contentfulImageUrl(coverImage.url, '400', '400', 'fill')}
    link={`/us/${slug}`}
  >
    <h3>
      <a href={`/us/${slug}`}>{title}</a>
    </h3>

    {subTitle ? <p>{subTitle}</p> : null}
  </Figure>
);

PageGalleryItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  slug: PropTypes.string.isRequired,
};

PageGalleryItem.defaultProps = {
  subTitle: null,
  coverImage: {},
};

export default PageGalleryItem;
