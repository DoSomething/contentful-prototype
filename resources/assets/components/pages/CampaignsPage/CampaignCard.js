import React from 'react';
import PropTypes from 'prop-types';

import { appendToQuery } from '../../../helpers';

const Campaign = ({ campaign }) => {
  return (
    <li className="gallery-item">
      <a className="wrapper" href={campaign.url}>
        <img
          src={appendToQuery(
            {
              w: 400,
              h: 400,
              fit: 'fill',
            },
            campaign.coverImage.url,
          )}
          alt={campaign.coverImage.description}
        />
        <div className="gallery-item__meta">
          <h1 className="gallery-item__title">{campaign.showcaseTitle}</h1>
          <p className="gallery-item__tagline">
            {campaign.showcaseDescription}
          </p>
        </div>
      </a>
    </li>
  );
};

Campaign.propTypes = {
  campaign: PropTypes.object.isRequired,
};

const CampaignCards = ({ campaigns }) => (
  <>
    <ul className="gallery-grid gallery-grid-quartet">
      {campaigns.map(campaign => {
        return (
          <Campaign
            campaign={campaign.node.campaignWebsite}
            key={`contentful-campaign${campaign.cursor}`}
          />
        );
      })}
    </ul>
  </>
);

CampaignCards.propTypes = {
  campaigns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CampaignCards;
