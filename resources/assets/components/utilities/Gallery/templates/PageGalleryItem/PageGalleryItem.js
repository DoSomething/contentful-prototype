import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../../Figure';
import { contentfulImageUrl } from '../../../../../helpers';

const PageGalleryItem = ({ title, subTitle, coverImage, slug }) => (
  <a className="page-gallery-item display-block" href={`/us/${slug}`}>
    <Figure
      alt={`${coverImage.description || title}-photo`}
      image={contentfulImageUrl(coverImage.url, '400', '400', 'fill')}
    >
      <span className="font-bold">{title}</span>
      <br />
      {subTitle ? <p className="font-normal">{subTitle}</p> : null}
    </Figure>
  </a>
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
