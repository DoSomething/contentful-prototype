import React from 'react';
import gql from 'graphql-tag';
import { css } from '@emotion/core';
import { propType } from 'graphql-anywhere';

import {
  contentfulImageUrl,
  contentfulImageSrcset,
  tailwind,
} from '../../../helpers';

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
      url
    }
    ... on StoryPageWebsite {
      id
      url
    }
  }
`;

const CampaignCardFeatured = ({ campaign }) => {
  const { showcaseDescription, showcaseImage, showcaseTitle, url } = campaign;

  const tailwindGray = tailwind('colors.gray');
  const tailwindScreens = tailwind('screens');

  const srcset = contentfulImageSrcset(showcaseImage.url, [
    { height: 205, width: 365 },
    { height: 410, width: 730 },
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
        <a className="block" href={url}>
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

        <a
          className="btn bg-blurple-500 hover:bg-blurple-300 text-white hover:text-white mt-4 xxl:mt-8 hover:no-underline p-4 xxl:px-8 text-lg w-full xxl:w-auto"
          href={url}
        >
          Get Started
        </a>
      </div>
    </article>
  );
};

CampaignCardFeatured.propTypes = {
  campaign: propType(campaignCardFeaturedFragment).isRequired,
};

export default CampaignCardFeatured;
