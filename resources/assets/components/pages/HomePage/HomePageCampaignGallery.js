import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import CampaignCard from '../../utilities/CampaignCard/CampaignCard';
import CampaignCardFeatured from '../../utilities/CampaignCard/CampaignCardFeatured';

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
              <CampaignCardFeatured campaign={campaign} />
            ) : (
              <CampaignCard campaign={campaign} />
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
