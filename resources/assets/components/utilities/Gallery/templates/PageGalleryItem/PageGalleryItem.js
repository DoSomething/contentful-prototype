import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../../Figure';
import { contentfulImageUrl } from '../../../../../helpers';

import './page-gallery-item.scss';

const PageGalleryItem = ({ title, subTitle, coverImage, slug }) => (
  <a className="page-gallery-item" href={`/us/${slug}`}>
    <Figure
      alt={`${coverImage.description || title}-photo`}
      image={contentfulImageUrl(coverImage.url, '400', '400', 'fill')}
    >
      <h3>{title}</h3>

      {subTitle ? <p className="description">{subTitle}</p> : null}
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
