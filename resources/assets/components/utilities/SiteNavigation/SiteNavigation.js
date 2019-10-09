import React from 'react';
import PropTypes from 'prop-types';

import MegaNav from './templates/MegaNav/MegaNav';

import './site-navigation.scss';

const SiteNavigation = props => {
  const { template } = props;

  switch (template) {
    case 'megaNav':
      return <MegaNav {...props} />;

    default:
      return null;
  }
};

SiteNavigation.propTypes = {
  template: PropTypes.string,
};

SiteNavigation.defaultProps = {
  template: null,
};

export default SiteNavigation;
