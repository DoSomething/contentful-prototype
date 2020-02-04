import React from 'react';
import Proptypes from 'prop-types';

const CampaignCard = ({ campaign }) => (
  <div className="block">
    <a className="wrapper hover:no-underline" href={campaign.slug}>
      <img src={campaign.coverImage} alt={campaign.title} />
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
    </a>
  </div>
);

CampaignCard.propTypes = {
  campaign: Proptypes.object.isRequired,
};

export default CampaignCard;
