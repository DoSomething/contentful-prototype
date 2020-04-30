import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import PrimaryButton from '../Button/PrimaryButton';
import { contentfulImageSrcset, contentfulImageUrl } from '../../../helpers';

export const scholarshipCardFragment = gql`
  fragment CampaignCard on Showcasable {
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

// Vertical
const ScholarshipFeatureBlock = ({
  title,
  description,
  deadline,
  amount,
  staffPick,
}) => {
  return (
    <article className="flex flex-col h-full relative text-left">
      <img
        style={{ width: '100%' }}
        src="https://picsum.photos/384/216"
        alt="test"
      />
      <div className="bg-white border-b border-l border-r border-gray-300 border-solid flex flex-col flex-grow p-4 rounded-b">
        {staffPick ? (
          <div className="absolute bg-purple-500 font-bold px-3 py-1 right-0 text-base text-white top-0 uppercase">
            Featured
          </div>
        ) : null}
        <h4>
          <a
            className="text-blurple-500 hover:text-blurple-300"
            href="https://google.com"
          >
            {title}
          </a>
        </h4>
        <p className="flex-grow">{description}</p>
        {/* <span className="pt-2 text-sm text-gray-500">
          Provided by DoSomething.org
        </span> */}
        <div className="pt-4">
          <div className="lg:float-left lg:pr-8">
            <h4 className="font-bold uppercase text-gray-600">Amount</h4>
            <p className="">{amount}</p>
          </div>
        </div>
        <div className="pt-4">
          <div className="lg:float-left lg:pr-8">
            <h4 className="font-bold uppercase text-gray-600">Deadline</h4>
            <p className="pb-4">{deadline}</p>
          </div>
          <div className="lg:float-left">
            <h4 className="font-bold uppercase text-gray-600">Time</h4>
            <p className="pb-4">Less than 5 Minutes</p>
          </div>
        </div>
        <button
          type="button"
          className="btn bg-blurple-500 border border-solid border-blurple-500 hover:bg-blurple-300 hover:border-blurple-300 focus:bg-blurple-500 focus:text-white focus:outline-none"
        >
          Apply Now
        </button>
      </div>
    </article>
  );
};

ScholarshipFeatureBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  deadline: PropTypes.string,
  amount: PropTypes.string,
  staffPick: PropTypes.bool.isRequired,
};

ScholarshipFeatureBlock.defaultProps = {
  title: 'Would You Rather',
  description:
    'Take our Would You Rather-style quiz and and share a personal finance guide with a friend.',
  deadline: 'March 31, 2020',
  amount: '$2,500',
};

export default ScholarshipFeatureBlock;

// ********************************************

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
      url
    }
    ... on StoryPageWebsite {
      id
      url
    }
  }
`;

const CampaignCard = ({ campaign }) => {
  const {
    showcaseDescription,
    showcaseImage,
    showcaseTitle,
    staffPick,
    url,
  } = campaign;

  const srcset = contentfulImageSrcset(showcaseImage.url, [
    { height: 205, width: 365 },
    { height: 410, width: 730 },
  ]);

  return (
    <article className="flex flex-col h-full relative text-left">
      <a className="block" href={url}>
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
          <a className="text-blurple-500 hover:text-blurple-300" href={url}>
            {showcaseTitle}
          </a>
        </h1>

        <p className="flex-grow">{showcaseDescription}</p>

        <SecondaryButton
          className="mt-4 w-full"
          href={url}
          text="Get Started"
        />
      </div>
    </article>
  );
};

CampaignCard.propTypes = {
  campaign: propType(campaignCardFragment).isRequired,
};
