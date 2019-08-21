import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';

const AdvisoryBoardMemberTemplate = props => {
  const { showcaseTitle, showcaseImage, showcaseDescription } = props;

  return (
    <Figure
      alt={`${showcaseTitle}-photo`}
      image={contentfulImageUrl(showcaseImage, '100', '100', 'fill')}
      alignment="left"
    >
      <h4>{showcaseTitle}</h4>

      {showcaseDescription ? (
        <TextContent>{showcaseDescription}</TextContent>
      ) : null}
    </Figure>
  );
};

AdvisoryBoardMemberTemplate.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseImage: PropTypes.string.isRequired,
  showcaseDescription: PropTypes.string.isRequired,
};

export default AdvisoryBoardMemberTemplate;
