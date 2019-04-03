import React from 'react';
import gql from 'graphql-tag';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PuckWaypoint } from '@dosomething/puck-client';

import LazyImage from './LazyImage';
import ErrorBlock from '../ErrorBlock/ErrorBlock';

const PERMITTED_HOSTNAMES = ['dosomething.carto.com'];

export const EmbedBlockFragment = gql`
  fragment EmbedBlockFragment on EmbedBlock {
    url
    previewImage {
      url(w: 700, h: 700)
      description
    }
  }
`;

const Iframe = ({ className, id, url, previewImage }) => {
  const hostname = new URL(url).hostname;

  if (!PERMITTED_HOSTNAMES.includes(hostname)) {
    console.warn(`Invalid URL ${url} supplied to Iframe component`);
    return <ErrorBlock />;
  }

  const iframeElement = () => (
    <iframe title={`embed ${id}`} src={url} width="100%" height="520" />
  );

  return (
    <div id={id} className={classnames('embed', className)}>
      <PuckWaypoint name="embed-top" waypointData={{ contentfulId: id }} />

      {previewImage ? (
        <Media query="(max-width: 759px)">
          {matches =>
            matches ? (
              <LazyImage
                className="rounded"
                src={previewImage.url}
                alt={
                  previewImage.description ||
                  'Preview image for embedded content'
                }
              />
            ) : (
              iframeElement()
            )
          }
        </Media>
      ) : (
        iframeElement()
      )}

      <PuckWaypoint name="embed-bottom" waypointData={{ contentfulId: id }} />
    </div>
  );
};

Iframe.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  previewImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

Iframe.defaultProps = {
  className: null,
  previewImage: null,
};

export default Iframe;
