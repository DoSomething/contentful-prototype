import React from 'react';

import CampaignCard from './CampaignCard';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const CampaignsPageTemplate = () => {
  const campaign = {
    title: 'Teens For Jeans',
    slug: 'dosomething.org',
    coverImage: 'iamge',
    description: 'Collect jeans for local youth experiencing homelessness.',
  };
  return (
    <>
      <SiteNavigationContainer />
      <main className="base-12-grid">
        <h1 className="grid-full">Campaigns For All Causes</h1>
        <CampaignCard campaign={campaign} />
      </main>
      <SiteFooter />
    </>
  );
};

export default CampaignsPageTemplate;
