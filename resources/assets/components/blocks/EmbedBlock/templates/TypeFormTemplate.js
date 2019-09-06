import React from 'react';
import PropTypes from 'prop-types';

import TypeFormEmbed from '../../../utilities/TypeFormEmbed/TypeFormEmbed';

const TypeFormTemplate = props => {
  return (
    <TypeFormEmbed
      typeformUrl={props.url}
      queryParameters={{
        northstar_id: props.userId,
      }}
    />
  );
};

export default TypeFormTemplate;

TypeFormTemplate.propTypes = {
  url: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

TypeFormTemplate.defaultProps = {
  userId: null,
};
