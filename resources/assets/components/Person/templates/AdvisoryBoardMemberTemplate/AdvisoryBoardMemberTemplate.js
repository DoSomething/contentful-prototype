import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import Markdown from '../../../utilities/Markdown/Markdown';

const AdvisoryBoardMemberTemplate = props => {
  const { name, photo, description } = props;

  return (
    <Figure
      alt={`${name}-photo`}
      image={contentfulImageUrl(photo, '100', '100', 'fill')}
      alignment="left"
    >
      <h3>{name}</h3>

      {description ? <Markdown>{description}</Markdown> : null}
    </Figure>
  );
};

AdvisoryBoardMemberTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AdvisoryBoardMemberTemplate;
