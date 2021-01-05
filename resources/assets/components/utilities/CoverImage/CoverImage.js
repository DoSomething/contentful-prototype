import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  contentfulImageUrl,
  contentfulImageSrcset,
} from '../../../helpers/contentful';

const CoverImage = ({ attributes, coverImage }) => {
  const srcset = contentfulImageSrcset(get(coverImage, 'url'), [
    { height: 360, width: 640 },
    { height: 576, width: 1024 },
    { height: 810, width: 1440 },
    { height: 1620, width: 2880 },
  ]);
  return (
    <div
      className="base-12-grid bg-gray-100 cover-image py-3 md:py-6"
      {...attributes}
    >
      <img
        className="grid-wide w-full"
        alt={
          get(coverImage, 'description') ||
          `large decorative image for campaign`
        }
        srcSet={srcset}
        src={contentfulImageUrl(get(coverImage, 'url'), '1440', '810', 'fill')}
      />
    </div>
  );
};

CoverImage.propTypes = {
  attributes: PropTypes.object,
  coverImage: PropTypes.object.isRequired,
};

CoverImage.defaultProps = {
  attributes: {},
};

export default CoverImage;
