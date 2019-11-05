import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure/Figure';
import TextContent from '../../../TextContent/TextContent';
import { contentfulImageUrl } from '../../../../../helpers';

const BoardMemberTemplate = props => {
  const { showcaseTitle, showcaseImage, showcaseDescription } = props;

  return (
    <Figure
      alt={`${showcaseTitle}-photo`}
      image={contentfulImageUrl(
        get(showcaseImage, 'url'),
        '400',
        '400',
        'fill',
      )}
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
  showcaseImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  showcaseDescription: PropTypes.string.isRequired,
};

export default BoardMemberTemplate;
