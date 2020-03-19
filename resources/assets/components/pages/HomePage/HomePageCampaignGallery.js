import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import CampaignGalleryItem from '../../utilities/Gallery/templates/CampaignGalleryItem/CampaignGalleryItemV2';
import CampaignGalleryFeaturedItem from '../../utilities/Gallery/templates/CampaignGalleryFeaturedItem/CampaignGalleryFeaturedItem';

const HomePageCampaignGallery = ({ campaigns }) => {
  const tailwindSpacing = tailwind('spacing');
  const tailwindScreens = tailwind('screens');

  return (
    <ul
      className="campaign-gallery mt-0"
      css={css`
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: ${tailwindSpacing['8']};

        @media (min-width: ${tailwindScreens.md}) {
          grid-template-columns: 1fr 1fr;
          grid-column-gap: ${tailwindSpacing['8']};
        }

        @media (min-width: ${tailwindScreens.xxl}) {
          grid-template-columns: 1fr 1fr 1fr;
        }
      `}
    >
      {campaigns.map((campaign, index) => {
        const firstItem = index === 0;

        return (
          <li
            key={campaign.id}
            css={css`
              @media (min-width: ${tailwindScreens.md}) {
                ${firstItem ? 'grid-column: span 2;' : ''}
              }
              @media (min-width: ${tailwindScreens.xxl}) {
                ${firstItem ? 'grid-column: span 3;' : ''}
              }
            `}
          >
            {firstItem ? (
              <CampaignGalleryFeaturedItem
                showcaseDescription={campaign.showcaseDescription}
                showcaseImage={campaign.showcaseImage}
                showcaseTitle={campaign.showcaseTitle}
                url={campaign.url}
              />
            ) : (
              <CampaignGalleryItem
                showcaseDescription={campaign.showcaseDescription}
                showcaseImage={campaign.showcaseImage}
                showcaseTitle={campaign.showcaseTitle}
                url={campaign.url}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

HomePageCampaignGallery.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePageCampaignGallery;
