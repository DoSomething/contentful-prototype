import React from 'react';
import PropTypes from 'prop-types';

import TypeFormEmbed from '../../../utilities/TypeFormEmbed/TypeFormEmbed';

const TypeFormTemplate = props => {
  return <TypeFormEmbed typeformUrl={props.url} {...props} />;
};

export default TypeFormTemplate;

TypeFormTemplate.propTypes = {
  url: PropTypes.string.isRequired,
};
