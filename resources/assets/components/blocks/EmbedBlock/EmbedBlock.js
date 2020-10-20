import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Embed from '../../utilities/Embed/Embed';
import TypeFormTemplate from './templates/TypeFormTemplate';
import IframeEmbed from '../../utilities/IframeEmbed/IframeEmbed';

export const EmbedBlockFragment = gql`
  fragment EmbedBlockFragment on EmbedBlock {
    url
  }
`;

const EmbedBlock = props => {
  const hostname = new URL(props.url).hostname;

  switch (hostname) {
    case 'dosomething.typeform.com':
      return <TypeFormTemplate {...props} />;

    case 'dosomething.carto.com':
    case 'airtable.com':
      return <IframeEmbed {...props} />;

    default:
      return <Embed url={props.url} badged />;
  }
};

EmbedBlock.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EmbedBlock;
