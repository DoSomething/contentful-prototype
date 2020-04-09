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
import { isExternal } from '../../../helpers';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PlaceholderText from '../PlaceholderText/PlaceholderText';

const EMBED_QUERY = gql`
  query EmbedQuery($url: AbsoluteUrl!) {
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
  const { url, badged, className } = props;

  // @TODO: Add onClick once LinkAction no longer calls Embed (causes duplicate events)
  // @see https://github.com/DoSomething/phoenix-next/pull/1598#issuecomment-532744108
  /*
  const onClick = () => {
    trackAnalyticsEvent('clicked_link_embed', {
      action: 'link_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'embed',
      context: {
        url,
      },
    });
  };
  */

  return (
    <div
      css={tw`bg-white border border-solid border-gray-300 overflow-hidden rounded`}
      className={className}
    >
      <Query query={EMBED_QUERY} variables={{ url }}>
        {({ loading, error, data }) => {
          const isLoaded = !loading;
          const embed = get(data, 'embed', {});

          if (error) {
            return <ErrorBlock />;
          }

          // If an <iframe> code snippet is provided, use that.
          // Otherwise, fill in our "embed card".
          return isLoaded && embed && embed.html ? (
            <div
              className={classnames({ 'media-video': embed.type === 'VIDEO' })}
              dangerouslySetInnerHTML={{ __html: embed.html }}
            />
          ) : (
            <a
              href={url}
              css={tw`no-underline hover:no-underline`}
              target={isExternal(url) ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              <div
                css={tw`flex flex-col md:flex-row`}
                style={{ minHeight: '100px' }}
              >
                <LazyImage
                  css={previewImageCss}
                  src={isLoaded && embed ? embed.thumbnailUrl : null}
                  asBackground
                />
                <div css={tw`flex-auto p-3`}>
                  <div css={tw`my-3 mr-3`}>
                    <h3>
                      {isLoaded ? (
                        truncate(embed ? embed.title : url, { length: 60 })
                      ) : (
                        <PlaceholderText size="medium" />
                      )}
                    </h3>
                    <p css={tw`text-gray-600 font-normal`}>
                      {isLoaded ? (
                        truncate(embed ? embed.description : '', {
                          length: 240,
                        })
                      ) : (
                        <PlaceholderText size="large" />
                      )}
                    </p>
                    <p css={tw`text-gray-700 text-sm mt-3 font-bold uppercase`}>
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
                    css={tw`bg-blue-500 hover:bg-blue-300 flex-initial flex justify-center p-3 border-none`}
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
};

Embed.defaultProps = {
  className: null,
  badged: false,
};

export default Embed;
