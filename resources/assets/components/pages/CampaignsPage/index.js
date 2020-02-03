import React from 'react';

import CampaignCard from './CampaignCard';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const CampaignsPage = () => (
  <>
    <SiteNavigationContainer />
    <main>
      <h1>Campaigns For All Causes</h1>
      <CampaignCard />
    </main>
    <SiteFooter />
  </>
);

export default CampaignsPage;
