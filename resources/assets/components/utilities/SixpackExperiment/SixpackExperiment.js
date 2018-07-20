import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';

import { participate } from '../../../helpers/experiments';
import ContentfulEntry from '../../ContentfulEntry';

const SixpackExperiment = props => {
  const { alternatives, campaignId, title } = props;

  participate(
    snakeCase(title),
    alternatives.map(item => snakeCase(item.fields.title)),
  );

  const selectedAlternativeJson = alternatives[1];

  return <ContentfulEntry json={selectedAlternativeJson} />;
};

SixpackExperiment.propType = {
  title: PropTypes.string.isRequired,
};

export default SixpackExperiment;
