import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import ErrorBlock from '../ErrorBlock/ErrorBlock';
import CartoTemplate from './templates/CartoTemplate';
import TypeFormTemplate from './templates/TypeFormTemplate';

const PERMITTED_HOSTNAMES = [
  'dosomething.carto.com',
  'dosomething.typeform.com',
];

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
  const { url } = props;
  const hostname = new URL(url).hostname;

  const domainCleanUp = baseURL => {
    let finalDomain;
    PERMITTED_HOSTNAMES.forEach(domain => {
      if (domain === baseURL) {
        finalDomain = baseURL.includes('carto') ? 'carto' : 'typeform';
      }
    });
    return finalDomain;
  };
  // add method to pull out domain names and clean them up

  switch (domainCleanUp(hostname)) {
    case 'typeform':
      return <TypeFormTemplate {...props} />;

    case 'carto':
      return <CartoTemplate {...props} />;

    default:
      return <ErrorBlock />;
  }
};

EmbedBlock.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EmbedBlock;

// @TODO update/confirm logic of template on props vs url
// @TODO add graphQL query here vs in utility files?
// @TODO add add  here vs in utility files?
