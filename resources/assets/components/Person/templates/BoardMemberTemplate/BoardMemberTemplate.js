import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';
import Markdown from '../../../utilities/Markdown/Markdown';

const BoardMemberTemplate = props => {
  const { name, alternatePhoto, description } = props;

  return (
    <Figure
      alt={`${name}-photo`}
      image={contentfulImageUrl(alternatePhoto, '400', '400', 'fill')}
    >
      <p className="font-bold">{name}</p>

      {description ? <Markdown>{description}</Markdown> : null}
    </Figure>
  );
};

BoardMemberTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  alternatePhoto: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BoardMemberTemplate;
