import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import TextContent from '../../../utilities/TextContent/TextContent';

const AdvisoryBoardMemberTemplate = props => {
  const { name, photo, description } = props;

  return (
    <Figure
      alt={`${name}-photo`}
      image={contentfulImageUrl(photo, '100', '100', 'fill')}
      alignment="left"
    >
      <h4>{name}</h4>

      {description ? <TextContent>{description}</TextContent> : null}
    </Figure>
  );
};

AdvisoryBoardMemberTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AdvisoryBoardMemberTemplate;
