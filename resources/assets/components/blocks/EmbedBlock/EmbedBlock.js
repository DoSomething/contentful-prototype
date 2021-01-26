import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Embed from '../../utilities/Embed/Embed';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
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

    case 'www.youtube.com':
    case 'youtu.be':
      return <Embed url={props.url} badged />;

    default:
      return (
        <ErrorBlock error={`${props.url} is not a supported embeddable URL.`} />
      );
  }
};

EmbedBlock.propTypes = {
  url: PropTypes.string.isRequired,
};

export default EmbedBlock;
