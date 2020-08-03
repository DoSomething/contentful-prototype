import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import SecondaryButton from '../Button/SecondaryButton';
import { contentfulImageSrcset, contentfulImageUrl } from '../../../helpers';

export const campaignCardFragment = gql`
  fragment CampaignCard on Showcasable {
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

const CampaignCard = ({ campaign }) => {
  const {
    showcaseDescription,
    showcaseImage,
    showcaseTitle,
    staffPick,
    path,
  } = campaign;

  const srcset = contentfulImageSrcset(showcaseImage.url, [
    { height: 205, width: 365 },
    { height: 410, width: 730 },
    { height: 820, width: 1460 },
  ]);

  return (
    <article
      className="flex flex-col h-full relative text-left"
      data-testid="campaign-card"
    >
      <a className="block" href={path}>
        <img
          alt={showcaseImage.description || `Cover photo for ${showcaseTitle}`}
          srcSet={srcset}
          src={contentfulImageUrl(showcaseImage.url, '365', '205', 'fill')}
        />
      </a>

      <div className="bg-white border-b-2 border-l-2 border-r-2 border-gray-300 border-solid flex flex-col flex-grow p-4 rounded-b">
        {staffPick ? (
          <div className="absolute bg-purple-500 font-bold left-0 px-3 py-1 text-base text-white top-0 uppercase">
            Featured
          </div>
        ) : null}

        <h1 className="font-bold mb-2 text-base">
          <a className="text-blurple-500 hover:text-blurple-300" href={path}>
            {showcaseTitle}
          </a>
        </h1>

        <p className="flex-grow">{showcaseDescription}</p>

        <SecondaryButton
          className="mt-4 w-full"
          href={path}
          text="Get Started"
        />
      </div>
    </article>
  );
};

CampaignCard.propTypes = {
  campaign: propType(campaignCardFragment).isRequired,
};

export default CampaignCard;
