/* eslint-disable react/no-danger */

import React from 'react';
import gql from 'graphql-tag';
import { get, truncate } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import LazyImage from '../LazyImage';
import linkIcon from './linkIcon.svg';
import { isExternal } from '../../../helpers';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import PlaceholderText from '../PlaceholderText/PlaceholderText';

import './embed.scss';

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

const Embed = props => {
  const { url, badged, className } = props;

  // @TODO: Add onClick once LinkAction no longer calls Embed (causes duplicate events)
  // @see https://github.com/DoSomething/phoenix-next/pull/1598#issuecomment-532744108
  /*
  const onClick = () => {
    trackAnalyticsEvent({
      context: {
        url,
      },
      metadata: {
        category: 'site_action',
        adjective: 'embed',
        noun: 'link',
        target: 'link',
        verb: 'clicked',
      },
    });
  };
  */

  return (
    <div
      className={classnames(
        'bg-white bordered overflow-hidden rounded',
        className,
      )}
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
              className="embed__linker"
              target={isExternal(url) ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              <div className="embed">
                <LazyImage
                  className="embed__image"
                  src={isLoaded && embed ? embed.thumbnailUrl : null}
                  asBackground
                />
                <div className="embed__content p-3">
                  <div className="my-3 mr-3">
                    <h3>
                      {isLoaded ? (
                        truncate(embed ? embed.title : url, { length: 60 })
                      ) : (
                        <PlaceholderText size="medium" />
                      )}
                    </h3>
                    <p className="color-gray">
                      {isLoaded ? (
                        truncate(embed ? embed.description : '', {
                          length: 240,
                        })
                      ) : (
                        <PlaceholderText size="large" />
                      )}
                    </p>
                    <p className="footnote mt-3 font-bold uppercase">
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
                  <div className="button embed__badge flex-center-xy">
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
