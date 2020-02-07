import React from 'react';
import PropTypes from 'prop-types';

const CampaignCard = ({ campaign }) => {
  console.log(campaign);
  return (
    <div>
      <h1>{campaign.campaignWebsite.showcaseTitle}</h1>
    </div>
  );
};

CampaignCard.propTypes = {
  campaign: PropTypes.object.isRequired,
};

export default CampaignCard;
