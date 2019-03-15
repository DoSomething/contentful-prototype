/* eslint-disable react/no-danger */

import React from 'react';
import gql from 'graphql-tag';
import { truncate } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Query } from 'react-apollo';

import linkIcon from './linkIcon.svg';
import { isExternal } from '../../../helpers';
import LazyImage from '../LazyImage';
import PlaceholderText from '../PlaceholderText/PlaceholderText';

import './embed.scss';

const EMBED_QUERY = gql`
  query EmbedQuery($url: AbsoluteUrl!) {
    embed(url: $url) {
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

  return (
    <div className={classnames('bordered', 'rounded', 'bg-white', className)}>
      <Query query={EMBED_QUERY} variables={{ url }}>
        {({ loading, error, data }) => {
          const finishedLoading = !loading;
          const embed = data.embed;

          console.log('EMBED_QUERY', { url, loading, embed });

          if (error) {
            return `Error! ${error.message}`;
          }

          // If an <iframe> code snippet is provided, use that.
          // Otherwise, fill in our "embed card".
          return finishedLoading && embed && embed.html ? (
            <div
              className="media-video"
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
                  src={finishedLoading && embed ? embed.thumbnailUrl : null}
                  asBackground
                />
                <div className="embed__content padded">
                  <div className="margin-vertical-md margin-right-md">
                    <h3 className="line-break">
                      {finishedLoading ? (
                        truncate(embed ? embed.title : url, { length: 60 })
                      ) : (
                        <PlaceholderText size="medium" />
                      )}
                    </h3>
                    <p className="color-gray">
                      {finishedLoading ? (
                        truncate(embed ? embed.description : '', {
                          length: 240,
                        })
                      ) : (
                        <PlaceholderText size="large" />
                      )}
                    </p>
                    <p className="footnote font-bold caps-lock">
                      {finishedLoading ? (
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
