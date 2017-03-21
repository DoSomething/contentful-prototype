import React from 'react';
import { contentfulImageUrl } from '../../helpers';

const ContentfulImage = ({ url, width = null, height = null, fit = 'fill', description = 'something' }) => (
  <img alt={description ? description : null} src={contentfulImageUrl(url, width, height, fit)} />
);

ContentfulImage.propTypes = {
  url: React.PropTypes.string.isRequired,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  fit: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default ContentfulImage;
