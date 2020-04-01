import React from 'react';
import PropTypes from 'prop-types';

import {
  contentfulImageSrcset,
  contentfulImageUrl,
} from '../../../../../helpers';

const PageGalleryItem = ({
  showcaseDescription,
  showcaseImage,
  showcaseTitle,
  slug,
}) => {
  const srcset = contentfulImageSrcset(showcaseImage.url, [
    { height: 205, width: 365 },
    { height: 410, width: 730 },
  ]);

  return (
    <article className="h-full text-left">
      <a
        href={`/us/${slug}`}
        className="flex flex-col h-full hover:no-underline"
      >
        <img
          alt={showcaseImage.description || `Cover photo for ${showcaseTitle}`}
          srcSet={srcset}
          src={contentfulImageUrl(showcaseImage.url, '365', '205', 'fill')}
        />

        <div className="bg-white border-b-2 border-l-2 border-r-2 border-gray-300 border-solid flex-grow p-4 rounded-b">
          <h1 className="font-bold mb-2 text-base text-blurple-500">
            {showcaseTitle}
          </h1>

          <p className="flex-grow font-normal">{showcaseDescription}</p>
        </div>
      </a>
    </article>
  );
};

PageGalleryItem.propTypes = {
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.object.isRequired,
  showcaseTitle: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default PageGalleryItem;
