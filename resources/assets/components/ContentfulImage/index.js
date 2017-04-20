import React from 'react';
import { contentfulImageUrl } from '../../helpers';

const ContentfulImage = ({ url, width, height, fit }) => (
  <img src={contentfulImageUrl(url, width, height, fit)} />
);

ContentfulImage.propTypes = {
  url: React.PropTypes.string.isRequired,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fit: React.PropTypes.string,
};

ContentfulImage.defaultProps = {
  width: null,
  height: null,
  fit: 'fill',
};

export default ContentfulImage;
