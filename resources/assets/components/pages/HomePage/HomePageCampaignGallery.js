import React from 'react';
import { first } from 'lodash-es';

const HomePageCampaignGallery = ({ campaigns }) => {
  console.log('💩', campaigns);

  return (
    <ul className="campaign-gallery">
      {campaigns.map((campaign, index) => {
        console.log('😎', index, campaign);

        const firstItem = index === 0;

        return (
          <li key={campaign.id}>
            <article>
              {firstItem ? <span>Featured</span> : null}
              <h1>{campaign.showcaseTitle}</h1>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default HomePageCampaignGallery;
