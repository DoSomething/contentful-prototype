import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';

const AdvisoryBoardMemberTemplate = props => {
  const { showcasableTitle, showcasableImage, showcasableDescription } = props;

  return (
    <Figure
      alt={`${showcasableTitle}-photo`}
      image={contentfulImageUrl(showcasableImage, '100', '100', 'fill')}
      alignment="left"
    >
      <h4>{showcasableTitle}</h4>

      {showcasableDescription ? (
        <TextContent>{showcasableDescription}</TextContent>
      ) : null}
    </Figure>
  );
};

AdvisoryBoardMemberTemplate.propTypes = {
  showcasableTitle: PropTypes.string.isRequired,
  showcasableImage: PropTypes.string.isRequired,
  showcasableDescription: PropTypes.string.isRequired,
};

export default AdvisoryBoardMemberTemplate;
