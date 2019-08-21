import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';

const BoardMemberTemplate = props => {
  const { showcaseTitle, showcaseImage, showcaseDescription } = props;

  return (
    <Figure
      alt={`${showcaseTitle}-photo`}
      image={contentfulImageUrl(showcaseImage, '400', '400', 'fill')}
    >
      <h4>{showcaseTitle}</h4>

      {showcaseDescription ? (
        <TextContent>{showcaseDescription}</TextContent>
      ) : null}
    </Figure>
  );
};

BoardMemberTemplate.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.string.isRequired,
};

export default BoardMemberTemplate;
