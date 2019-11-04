import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure/Figure';
import TextContent from '../../../TextContent/TextContent';
import { contentfulImageUrl } from '../../../../../helpers';

const AdvisoryBoardMemberTemplate = props => {
  const { name, photo, description } = props;

  return (
    <Figure
      alt={`${name}-photo`}
      image={contentfulImageUrl(photo.url, '100', '100', 'fill')}
      alignment="left"
    >
      <h4>{name}</h4>

      {description ? <TextContent>{description}</TextContent> : null}
    </Figure>
  );
};

AdvisoryBoardMemberTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
};

export default AdvisoryBoardMemberTemplate;
