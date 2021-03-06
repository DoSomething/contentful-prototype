/* eslint-disable react/no-danger */

import React from 'react';
import tw from 'twin.macro';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { get, truncate } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import LazyImage from '../LazyImage';
import linkIcon from './link_icon.svg';
import { isExternal } from '../../../helpers/url';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PlaceholderText from '../PlaceholderText/PlaceholderText';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

export const EMBED_QUERY = gql`
  query EmbedQuery($url: URL!) {
    embed(url: $url) {
      type
      title
      providerName
      thumbnailUrl
      description
      html
    }
  }
`;

const previewImageCss = css`
  ${tw`bg-gray-200 bg-cover bg-center`}
  flex: 0 0 150px;
`;

const Embed = props => {
  const { url, badged, className, dontTrack } = props;

  const handleClick = () => {
    if (dontTrack) {
      return;
    }

    trackAnalyticsEvent('clicked_link_embed', {
      action: 'element_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'embed',
      context: {
        url,
      },
    });
  };

  return (
    <div
      className={classnames(
        'bg-white border border-solid border-transparent-black-10 border-no-clip overflow-hidden rounded',
        className,
      )}
      data-testid="embed"
    >
      <Query query={EMBED_QUERY} variables={{ url }}>
        {({ loading, error, data }) => {
          const isLoaded = !loading;
          const embed = get(data, 'embed', {});

          if (error) {
            return <ErrorBlock error={error} />;
          }

          // If an <iframe> code snippet is provided, use that.
          // Otherwise, fill in our "embed card".
          return isLoaded && embed && embed.html ? (
            <div
              className={classnames({ 'media-video': embed.type === 'VIDEO' })}
              dangerouslySetInnerHTML={{ __html: embed.html }}
              data-testid="embed-html"
            />
          ) : (
            <a
              href={url}
              className="block no-underline hover:no-underline"
              target={isExternal(url) ? '_blank' : '_self'}
              onClick={handleClick}
              rel="noopener noreferrer"
            >
              <div
                className="flex flex-col md:flex-row"
                style={{ minHeight: '100px' }}
              >
                <LazyImage
                  css={previewImageCss}
                  src={isLoaded && embed ? embed.thumbnailUrl : null}
                  asBackground
                />
                <div className="flex-auto p-3">
                  <div className="my-3 mr-3">
                    <h3 data-testid="embed-title">
                      {isLoaded ? (
                        truncate(embed ? embed.title : url, { length: 60 })
                      ) : (
                        <PlaceholderText size="medium" />
                      )}
                    </h3>
                    <p
                      className="text-gray-600 font-normal"
                      data-testid="embed-description"
                    >
                      {isLoaded ? (
                        truncate(embed ? embed.description : '', {
                          length: 240,
                        })
                      ) : (
                        <PlaceholderText size="large" />
                      )}
                    </p>
                    <p
                      className="text-gray-700 text-sm mt-3 font-bold uppercase"
                      data-testid="embed-provider-name"
                    >
                      {isLoaded ? (
                        truncate(embed ? embed.providerName : 'External Link', {
                          length: 60,
                        })
                      ) : (
                        <PlaceholderText size="small" />
                      )}
                    </p>
                  </div>
                </div>
                {badged ? (
                  <div
                    className="bg-blue-500 hover:bg-blue-300 flex-initial flex item-center justify-center p-3 border-none"
                    data-testid="embed-badge"
                  >
                    <img src={linkIcon} alt="link" />
                  </div>
                ) : null}
              </div>
            </a>
          );
        }}
      </Query>
    </div>
  );
};

Embed.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  badged: PropTypes.bool,
  dontTrack: PropTypes.bool,
};

Embed.defaultProps = {
  className: null,
  badged: false,
  dontTrack: false,
};

export default Embed;
