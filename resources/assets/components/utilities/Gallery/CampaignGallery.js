import React from 'react';
import PropTypes from 'prop-types';

import CampaignCard from '../CampaignCard/CampaignCard';
import CampaignGalleryWithFeature from './CampaignGalleryWithFeature';

const CampaignGallery = ({ campaigns, hasButton, hasFeatured }) => {
  return hasFeatured ? (
    <CampaignGalleryWithFeature campaigns={campaigns} hasButton={hasButton} />
  ) : (
    <ul className="campaign-gallery mt-0 gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3">
      {campaigns.map(campaign => {
        return (
          <li key={campaign.id}>
            <CampaignCard campaign={campaign} hasButton={hasButton} />
          </li>
        );
      })}
    </ul>
  );
};

CampaignGallery.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasButton: PropTypes.bool,
  hasFeatured: PropTypes.bool,
};

CampaignGallery.defaultProps = {
  hasButton: false,
  hasFeatured: false,
};

export default CampaignGallery;
