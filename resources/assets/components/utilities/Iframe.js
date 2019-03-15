import React from 'react';
import gql from 'graphql-tag';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';
import { PuckWaypoint } from '@dosomething/puck-client';

import LazyImage from './LazyImage';
import ErrorBlock from '../ErrorBlock/ErrorBlock';

const PERMITTED_HOSTNAMES = ['dosomething.carto.com'];

const EMBED_QUERY = gql`
  query EmbedQuery($url: AbsoluteUrl!) {
    embed(url: $url) {
      thumbnailUrl
    }
  }
`;

const Iframe = ({ className, id, url }) => {
  const hostname = new URL(url).hostname;

  if (!PERMITTED_HOSTNAMES.includes(hostname)) {
    console.warn(`Invalid URL ${url} supplied to Iframe component`);
    return <ErrorBlock />;
  }

  return (
    <div id={id} className={classnames('embed margin-bottom-lg', className)}>
      <PuckWaypoint name="embed-top" waypointData={{ contentfulId: id }} />
      <Media query="(max-width: 759px)">
        {matches =>
          matches ? (
            <Query query={EMBED_QUERY} variables={{ url }}>
              {({ loading, error, data }) => {
                const isLoaded = !loading;
                const { embed } = data;

                if (error) {
                  return <ErrorBlock />;
                }

                return (
                  <LazyImage
                    className="rounded"
                    src={isLoaded ? embed.thumbnailUrl : null}
                    alt="Preview image for embedded content"
                  />
                );
              }}
            </Query>
          ) : (
            <iframe title={`embed ${id}`} src={url} width="100%" height="520" />
          )
        }
      </Media>
      <PuckWaypoint name="embed-bottom" waypointData={{ contentfulId: id }} />
    </div>
  );
};

Iframe.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

Iframe.defaultProps = {
  className: null,
};

export default Iframe;
