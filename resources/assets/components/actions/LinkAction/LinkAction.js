import React from 'react';
import PropTypes from 'prop-types';

import ClassicTemplate from './templates/ClassicTemplate';

const LinkAction = props => {
  const { template } = props;

  switch (template) {
    default:
      return <ClassicTemplate {...props} />;
  }
};

LinkAction.propTypes = {
  template: PropTypes.string,
};

LinkAction.defaultProps = {
  template: null,
};

export default LinkAction;
