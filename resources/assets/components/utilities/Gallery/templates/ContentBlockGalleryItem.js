import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import Markdown from '../../../utilities/Markdown/Markdown';

const ContentBlockGalleryItem = ({ title, image, content }) => (
  <Figure alt={`${title}-photo`} image={image}>
    <h3>{title}</h3>

    {content ? <Markdown>{content}</Markdown> : null}
  </Figure>
);

ContentBlockGalleryItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  content: PropTypes.string.isRequired,
};

ContentBlockGalleryItem.defaultProps = {
  image: null,
};

export default ContentBlockGalleryItem;
