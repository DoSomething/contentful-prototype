import PropTypes from 'prop-types';
import React from 'react';

import { contentfulImageUrl } from '../../../helpers';

const ContentfulImage = ({ url, width, height, fit }) => (
  <img alt="" src={contentfulImageUrl(url, width, height, fit)} />
);

ContentfulImage.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fit: PropTypes.string,
};

ContentfulImage.defaultProps = {
  width: null,
  height: null,
  fit: 'fill',
};

export default ContentfulImage;
