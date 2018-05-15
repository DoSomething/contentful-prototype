import React from 'react';
import PropTypes from 'prop-types';

import CtaTemplate from './templates/CtaTemplate';
import DefaultTemplate from './templates/DefaultTemplate';

const LinkAction = props => {
  const { template } = props;

  switch (template) {
    case 'cta':
      return <CtaTemplate {...props} />;
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
