import React from 'react';
import PropTypes from 'prop-types';

import { getUserId } from '../../../../helpers/auth';
import TypeFormEmbed from '../../../utilities/TypeFormEmbed/TypeFormEmbed';

const TypeFormTemplate = props => {
  return (
    <TypeFormEmbed
      displayType="block"
      typeformUrl={props.url}
      queryParameters={{
        northstar_id: getUserId(),
      }}
    />
  );
};

export default TypeFormTemplate;

TypeFormTemplate.propTypes = {
  url: PropTypes.string.isRequired,
};
