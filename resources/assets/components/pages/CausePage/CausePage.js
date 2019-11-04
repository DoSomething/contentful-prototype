import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../../utilities/TextContent/TextContent';

const CausePage = ({ coverImage, superTitle, title, description, content }) => (
  <div>
    <img src={coverImage.url} alt={coverImage.description} />
    <p>{superTitle}</p>
    <h1>{title}</h1>
    <TextContent>{description}</TextContent>

    <TextContent>{content}</TextContent>
  </div>
);

CausePage.propTypes = {
  coverImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  superTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
};

export default CausePage;
