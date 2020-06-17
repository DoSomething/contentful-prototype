import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import CartoTemplate from './templates/CartoTemplate';
import TypeFormTemplate from './templates/TypeFormTemplate';

const PERMITTED_HOSTNAMES = {
  'dosomething.carto.com': 'carto',
  'dosomething.typeform.com': 'typeform',
};

export const EmbedBlockFragment = gql`
  fragment EmbedBlockFragment on EmbedBlock {
    url
    previewImage {
      url(w: 700, h: 700)
      description
    }
  }
`;

const EmbedBlock = props => {
  const hostname = new URL(props.url).hostname;

  const domain = PERMITTED_HOSTNAMES[hostname];

  switch (domain) {
    case 'typeform':
      return <TypeFormTemplate {...props} />;

    case 'carto':
      return <CartoTemplate {...props} />;

    default:
      return (
        <ErrorBlock
          error={`Embed Block URL contains a non permitted hostname. Hostname: ${hostname}`}
        />
      );
  }
};

EmbedBlock.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EmbedBlock;
