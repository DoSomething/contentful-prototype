import React from 'react';
import PropTypes from 'prop-types';

import { contentfulImageUrl } from '../../../../../helpers';

const CampaignGalleryItemV2 = ({
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
        <div className="absolute bg-purple-500 font-bold px-3 py-1 right-0 text-base text-white top-0 uppercase">
          Featured
        </div>

        <h1 className="font-bold mb-3 text-base text-blurple-500">
          {showcaseTitle}
        </h1>

        <p className="flex-grow">{showcaseDescription}</p>

        <a
          className="btn bg-white border border-solid border-blurple-500 hover:border-blurple-300 hover:no-underline text-blurple-500 hover:text-blurple-200 mt-4 w-full"
          href={url}
        >
          Get Started
        </a>
      </div>
    </article>
  );
};

CampaignGalleryItemV2.propTypes = {
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.object.isRequired,
  showcaseTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default CampaignGalleryItemV2;