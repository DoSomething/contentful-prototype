import React from 'react';
import PropTypes from 'prop-types';

const CampaignCard = ({ campaign }) => {
  return (
    <div>
      <a href={campaign.campaignWebsite.url}>
        <img
          src={campaign.campaignWebsite.coverImage.url}
          alt={campaign.campaignWebsite.coverImage.description}
        />
        <h1>{campaign.campaignWebsite.showcaseTitle}</h1>
        <p>{campaign.campaignWebsite.showcaseDescription}</p>
      </a>
    </div>
  );
};

CampaignCard.propTypes = {
  campaign: PropTypes.object.isRequired,
};

export default CampaignCard;
