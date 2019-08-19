import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';

const BoardMemberTemplate = props => {
  const { showcasableTitle, showcasableImage, showcasableDescription } = props;

  return (
    <Figure
      alt={`${showcasableTitle}-photo`}
      image={contentfulImageUrl(showcasableImage, '400', '400', 'fill')}
    >
      <h4>{showcasableTitle}</h4>

      {showcasableDescription ? (
        <TextContent>{showcasableDescription}</TextContent>
      ) : null}
    </Figure>
  );
};

BoardMemberTemplate.propTypes = {
  description: PropTypes.string.isRequired,
  showcasableTitle: PropTypes.string.isRequired,
  showcasableDescription: PropTypes.string.isRequired,
  showcasableImage: PropTypes.string.isRequired,
};

export default BoardMemberTemplate;
