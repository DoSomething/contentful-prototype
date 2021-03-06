import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { propType } from 'graphql-anywhere';

import { tailwind } from '../../../helpers/display';
import PrimaryButton from '../Button/PrimaryButton';
import {
  contentfulImageUrl,
  contentfulImageSrcset,
} from '../../../helpers/contentful';

export const campaignCardFeaturedFragment = gql`
  fragment CampaignCardFeatured on Showcasable {
    showcaseTitle
    showcaseDescription
    showcaseImage {
      url
    }
    ... on CampaignWebsite {
      id
      staffPick
      path
    }
    ... on StoryPageWebsite {
      id
      path
    }
  }
`;

const CampaignCardFeatured = ({ campaign, hasButton }) => {
  const { showcaseDescription, showcaseImage, showcaseTitle, path } = campaign;

  const tailwindGray = tailwind('colors.gray');
  const tailwindScreens = tailwind('screens');

  const srcset = contentfulImageSrcset(showcaseImage.url, [
    { height: 205, width: 365 },
    { height: 410, width: 730 },
    { height: 820, width: 1460 },
    { height: 1100, width: 1960 },
  ]);

  return (
    <article
      className="xxl:bg-white xxl:col-gap-8 flex flex-col xxl:grid xxl:grid-cols-3 h-full text-left rounded"
      css={css`
        box-shadow: inset 0px 0px 0px 2px ${tailwindGray['300']};
      `}
    >
      <div
        className="xxl:col-span-2 w-full"
        css={css`
          @media (min-width: ${tailwindScreens.xxl}) {
            background-image: url('${contentfulImageUrl(
              showcaseImage.url,
              '1468',
              '826',
              'fill',
            )}');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      >
        <a className="block" href={path}>
          <img
            alt={
              showcaseImage.description || `Cover photo for ${showcaseTitle}`
            }
            className="xxl:invisible"
            srcSet={srcset}
            src={contentfulImageUrl(showcaseImage.url, '365', '205', 'fill')}
          />
        </a>
      </div>

      <div className="bg-white border-b-2 border-l-2 xxl:border-l-0 border-r-2 xxl:border-t-2 border-gray-300 border-solid flex xxl:block flex-col flex-grow p-4 xxl:p-8 xxl:pl-0 rounded-b xxl:rounded-b-none">
        <div className="font-bold text-base text-purple-500 xxl:text-lg uppercase">
          Featured
        </div>

        <h1 className="font-normal font-league-gothic mb-2 text-3xl text-gray-900 uppercase">
          {showcaseTitle}
        </h1>

        <p className="flex-grow xxl:text-lg">{showcaseDescription}</p>

        {hasButton ? (
          <PrimaryButton
            className="mt-4 xxl:mt-8 p-4 xxl:px-8 text-lg w-full xxl:w-auto"
            href={path}
            text="Get Started"
          />
        ) : null}
      </div>
    </article>
  );
};

CampaignCardFeatured.propTypes = {
  campaign: propType(campaignCardFeaturedFragment).isRequired,
  hasButton: PropTypes.bool,
};

CampaignCardFeatured.defaultProps = {
  hasButton: false,
};

export default CampaignCardFeatured;
