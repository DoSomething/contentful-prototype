import React from 'react';
import PropTypes from 'prop-types';

import TypeFormTemplate from './templates/TypeFormTemplate';
import CartoTemplate from './templates/CartoTemplate';

const EmbedBlock = props => {
  const { template } = props;

  // add method to pull out domain names and clean them up

  switch (template) {
    case 'typeform':
      return <TypeFormTemplate {...props} />;

    default:
      return <CartoTemplate {...props} />;
  }
};

EmbedBlock.propTypes = {
  template: PropTypes.string.isRequired,
};

export default EmbedBlock;

// @TODO update/confirm logic of template on props vs url
// @TODO add graphQL query here vs in utility files?
// @TODO add add  here vs in utility files?
