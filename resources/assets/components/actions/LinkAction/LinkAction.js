import React from 'react';
import PropTypes from 'prop-types';

import DefaultTemplate from './templates/DefaultTemplate';

const LinkAction = props => {
  const { template } = props;

  switch (template) {
    default:
      return <DefaultTemplate {...props} />;
  }
};

LinkAction.propTypes = {
  template: PropTypes.string,
};

LinkAction.defaultProps = {
  template: null,
};

export default LinkAction;
