import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { get, truncate } from 'lodash';
import { useQuery } from '@apollo/react-hooks';

import LazyImage from '../LazyImage';
import ExternalLinkIcon from './ExternalLinkIcon';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import {
  contentfulImageSrcset,
  contentfulImageUrl,
} from '../../../helpers/contentful';

const EXTERNAL_LINK_QUERY = gql`
  query ExternalLinkQuery($url: URL!) {
    embed(url: $url) {
      title
      description
      thumbnailUrl
      providerName
    }
  }
`;

export const ExternalLinkBlockFragment = gql`
  fragment ExternalLinkBlockFragment on ExternalLinkBlock {
    externalLinkUrl: url
    title
    description
    image {
      url
      description
    }
  }
`;

const ExternalLinkCard = ({ url, title, description, image }) => {
  const { error, loading, data } = useQuery(EXTERNAL_LINK_QUERY, {
    variables: { url },
  });

  if (loading) {
    return <Spinner className="flex justify-center p-2" />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  const {
    title: providerTitle,
    description: providerDescription,
    thumbnailUrl,
    providerName,
  } = data.embed;

  const imageUrl = get(image, 'url');

  const srcset = imageUrl
    ? contentfulImageSrcset(imageUrl, [
        { height: 205, width: 365 },
        { height: 410, width: 730 },
        { height: 820, width: 1460 },
      ])
    : null;

  return (
    <article className="flex flex-col h-full text-left max-w-lg">
      <a href={url} className="block">
        {imageUrl ? (
          <img
            alt={get(
              image,
              'description',
              `Cover photo for ${title || providerTitle}`,
            )}
            srcSet={srcset}
            src={
              imageUrl
                ? contentfulImageUrl(imageUrl, '365', '205', 'fill')
                : thumbnailUrl
            }
          />
        ) : (
          <LazyImage
            className="bg-gray-200 bg-cover bg-center"
            src={thumbnailUrl}
            alt={`Cover photo for ${title || providerTitle}`}
          />
        )}
      </a>

      <div className="bg-white border-b-2 border-l-2 border-r-2 border-gray-300 border-solid flex-grow p-4 rounded-b">
        <p className="text-gray-700 text-sm font-bold uppercase">
          {truncate(providerName || 'External Link', {
            length: 60,
          })}
        </p>

        <h1 className="font-bold mt-1 text-base">
          <a className="text-blurple-500 hover:text-blurple-300" href={url}>
            <span>
              {title || providerTitle}&nbsp;&nbsp;
              <ExternalLinkIcon className="inline-block mb-1" />
            </span>
          </a>
        </h1>

        <p className="font-normal mt-2">{description || providerDescription}</p>
      </div>
    </article>
  );
};

ExternalLinkCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    desscription: PropTypes.string,
  }),
};

ExternalLinkCard.defaultProps = {
  title: null,
  description: null,
  image: {},
};

export default ExternalLinkCard;
