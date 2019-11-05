import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure/Figure';
import TextContent from '../../../TextContent/TextContent';
import { contentfulImageUrl } from '../../../../../helpers';

const BoardMemberTemplate = props => {
  const { name, alternatePhoto, description } = props;

  return (
    <Figure
      alt={`${name}-photo`}
      image={contentfulImageUrl(alternatePhoto.url, '400', '400', 'fill')}
    >
      <h4>{name}</h4>

      {description ? <TextContent>{description}</TextContent> : null}
    </Figure>
  );
};

BoardMemberTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  alternatePhoto: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
};

export default BoardMemberTemplate;
