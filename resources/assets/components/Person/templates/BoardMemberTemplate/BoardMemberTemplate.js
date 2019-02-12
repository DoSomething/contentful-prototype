import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';

const BoardMemberTemplate = props => {
  const { name, alternatePhoto, description } = props;

  return (
    <Figure
      alt={`${name}-photo`}
      image={contentfulImageUrl(alternatePhoto, '400', '400', 'fill')}
    >
      <h4>{name}</h4>

      {description ? <TextContent>{description}</TextContent> : null}
    </Figure>
  );
};

BoardMemberTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  alternatePhoto: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BoardMemberTemplate;
