import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';

import ContentfulEntry from '../../ContentfulEntry';

const SixpackExperiment = props => {
  const { alternatives, campaignId, title } = props;

  console.log(snakeCase(title));
  console.log(alternatives);

  const selectedAlternativeJson = alternatives[1];

  return <ContentfulEntry json={selectedAlternativeJson} />;
};

SixpackExperiment.propType = {
  title: PropTypes.string.isRequired,
};

export default SixpackExperiment;
