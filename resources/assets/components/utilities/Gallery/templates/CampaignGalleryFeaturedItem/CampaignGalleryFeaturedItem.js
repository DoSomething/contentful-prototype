import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import {
  contentfulImageUrl,
  contentfulImageSrcset,
  tailwind,
} from '../../../../../helpers';

const CampaignGalleryFeaturedItem = ({
  showcaseDescription,
  showcaseImage,
  showcaseTitle,
  url,
}) => {
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
        box-shadow: inset 0px 0px 0px 1px ${tailwindGray['300']};
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
        <img
          alt={showcaseImage.description || `Cover photo for ${showcaseTitle}`}
          className="xxl:invisible"
          srcSet={srcset}
          src={contentfulImageUrl(showcaseImage.url, '365', '205', 'fill')}
        />
      </div>

      <div className="bg-white border-b border-l xxl:border-l-0 border-r xxl:border-t border-gray-300 border-solid flex xxl:block flex-col flex-grow p-4 xxl:p-8 xxl:pl-0 rounded-b-sm">
        <div className="font-bold text-base text-purple-500 xxl:text-lg uppercase">
          Featured
        </div>

        <h1 className="font-normal font-league-gothic mb-3 text-3xl text-gray-900 uppercase">
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

CampaignGalleryFeaturedItem.propTypes = {
  showcaseDescription: PropTypes.string.isRequired,
  showcaseImage: PropTypes.object.isRequired,
  showcaseTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default CampaignGalleryFeaturedItem;
