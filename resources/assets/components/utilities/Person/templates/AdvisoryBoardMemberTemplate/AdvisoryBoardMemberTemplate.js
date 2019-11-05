import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure/Figure';
import TextContent from '../../../TextContent/TextContent';
import { contentfulImageUrl } from '../../../../../helpers';

const AdvisoryBoardMemberTemplate = props => {
  const { showcaseTitle, showcaseImage, showcaseDescription } = props;

  return (
    <Figure
      alt={`${showcaseTitle}-photo`}
      image={contentfulImageUrl(showcaseImage.url, '100', '100', 'fill')}
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
  showcaseImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  showcaseDescription: PropTypes.string.isRequired,
};

export default AdvisoryBoardMemberTemplate;
