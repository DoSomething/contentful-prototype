import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../../Figure';
import { contentfulImageUrl } from '../../../../../helpers';

const PageGalleryItem = ({ title, subTitle, coverImage, slug }) => {
  return (
    <a className="page-gallery-item block" href={`/us/${slug}`}>
      <Figure
        alt={`${coverImage.description || title}-photo`}
        image={contentfulImageUrl(coverImage.url, '400', '400', 'fill')}
      >
        <h4>{title}</h4>
        {subTitle ? <p className="font-normal">{subTitle}</p> : null}
      </Figure>
    </a>
  );
};

PageGalleryItem.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  coverImage: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  slug: PropTypes.string.isRequired,
};

PageGalleryItem.defaultProps = {
  title: null,
  subTitle: null,
  coverImage: {},
};

export default PageGalleryItem;
