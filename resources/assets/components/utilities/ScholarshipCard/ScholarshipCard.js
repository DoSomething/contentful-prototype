import React from 'react';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import SecondaryButton from '../Button/SecondaryButton';
import {
  contentfulImageSrcset,
  contentfulImageUrl,
  getHumanFriendlyDate,
} from '../../../helpers';

// Write a graphql query to get campaign information for a specific id
export const scholarshipCardFragment = gql`
  fragment ScholarshipCard on Showcasable {
    showcaseTitle
    showcaseDescription
    showcaseImage {
      url
    }
    ... on CampaignWebsite {
      id
      scholarshipAmount
      scholarshipDeadline
      staffPick
      url
    }
    ... on StoryPageWebsite {
      id
      url
    }
  }
`;

const ScholarshipCard = ({ campaign }) => {
  // Destructure all the pieces out of the campaign
  const {
    showcaseTitle,
    showcaseDescription,
    scholarshipAmount,
    scholarshipDeadline,
    showcaseImage,
    staffPick,
    url,
  } = campaign;

  const srcset = contentfulImageSrcset(showcaseImage.url, [
    { height: 205, width: 365 },
    { height: 410, width: 730 },
    { height: 820, width: 1460 },
  ]);

  return (
    <article className="flex flex-col h-full relative text-left">
      <a className="block cursor-pointer" href={url}>
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
          <a
            className="text-blurple-500 hover:text-blurple-300 cursor-pointer"
            href={url}
          >
            {showcaseTitle}
          </a>
        </h1>

        <p className="flex-grow">{showcaseDescription}</p>
        <div className="pt-4">
          <div className="float-left pr-8">
            <h4 className="font-bold uppercase text-gray-600">Amount</h4>
            <p className="">
              {scholarshipAmount ? scholarshipAmount.toLocaleString() : 'N/A'}
            </p>
          </div>
          <div className="float-left pr-8">
            <h4 className="font-bold uppercase text-gray-600">Deadline</h4>
            <p className="pb-4">
              {scholarshipDeadline
                ? getHumanFriendlyDate(scholarshipDeadline)
                : 'N/A'}
            </p>
          </div>
        </div>

        <SecondaryButton className="w-full" href={url} text="Apply Now" />
      </div>
    </article>
  );
};

ScholarshipCard.propTypes = {
  campaign: propType(scholarshipCardFragment).isRequired,
};

export default ScholarshipCard;