import React from 'react';
import PropTypes from 'prop-types';

import {
  contentfulImageSrcset,
  contentfulImageUrl,
} from '../../../../../helpers';

const CampaignGalleryItem = ({
  showcaseDescription,
  showcaseImage,
  showcaseTitle,
  staffPick,
  url,
}) => {
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
          <div className="absolute bg-purple-500 font-bold px-3 py-1 right-0 text-base text-white top-0 uppercase">
            Featured
          </div>
        ) : null}

        <h1 className="font-bold mb-2 text-base">
          <a className="text-blurple-500 hover:text-blurple-300" href={url}>
            {showcaseTitle}
          </a>
        </h1>

        <p className="flex-grow">{showcaseDescription}</p>

        <a
          className="btn bg-white border-2 border-solid border-blurple-500 hover:border-blurple-300 hover:no-underline text-blurple-500 hover:text-blurple-200 mt-4 w-full"
          href={url}
        >
          Get Started
        </a>
      </div>
    </article>
  );
};

CampaignGalleryItem.propTypes = {
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.object.isRequired,
  showcaseTitle: PropTypes.string.isRequired,
  staffPick: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

CampaignGalleryItem.defaultProps = {
  staffPick: false,
};

export default CampaignGalleryItem;
