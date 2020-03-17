import React from 'react';
import PropTypes from 'prop-types';

import { contentfulImageUrl } from '../../../../../helpers';

const CampaignGalleryFeaturedItem = ({
  showcaseDescription,
  showcaseImage,
  showcaseTitle,
  url,
}) => {
  return (
    <article className="flex flex-col h-full relative text-left">
      <img
        alt={showcaseImage.description || `Cover photo for ${showcaseTitle}`}
        className="w-full"
        src={contentfulImageUrl(showcaseImage.url, '360', '200', 'fill')}
      />

      <div className="bg-white border border-b border-l border-r border-gray-300 border-solid flex flex-col flex-grow p-4 rounded-b-sm">
        <div className="font-bold text-base text-purple-500 uppercase">
          Featured
        </div>

        <h1 className="font-normal font-league-gothic mb-3 text-3xl text-gray-900">
          {showcaseTitle}
        </h1>

        <p className="flex-grow">{showcaseDescription}</p>

        <a
          className="btn bg-blurple-500 hover:bg-blurple-300 text-white hover:text-white mt-4 hover:no-underline py-4 text-lg w-full"
          href={url}
        >
          Get Started
        </a>
      </div>
    </article>
  );
};

CampaignGalleryFeaturedItem.propTypes = {
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.object.isRequired,
  showcaseTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default CampaignGalleryFeaturedItem;
