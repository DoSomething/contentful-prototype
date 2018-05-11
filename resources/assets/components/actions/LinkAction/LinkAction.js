import React from 'react';
import PropTypes from 'prop-types';

import LinkActionCard from './templates/LinkActionCard';

const LinkAction = props => {
  const { template } = props;

  switch (template) {
    case 'card':
      return <LinkActionCard {...props} />;
    default:
      return <LinkActionCard {...props} />;
  }
};

LinkAction.propTypes = {
  template: PropTypes.string,
};

LinkAction.defaultProps = {
  template: 'card',
};

export default LinkAction;
