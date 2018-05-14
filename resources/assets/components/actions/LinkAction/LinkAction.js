import React from 'react';
import PropTypes from 'prop-types';

import CTATemplate from './templates/CTATemplate';
import DefaultTemplate from './templates/DefaultTemplate';

const LinkAction = props => {
  const { template } = props;

  switch (template) {
    case 'cta':
      return <CTATemplate {...props} />;
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
