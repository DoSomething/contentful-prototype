import React from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

const CampaignsIndexPage = () => (
  <>
    <SiteNavigationContainer />
    <main className="md:w-3/4 mx-auto">
      <h1 className="w-full my-6 pl-6 md:pl-0">Campaigns For All Causes</h1>
      <PaginatedCampaignGallery
        className="grid-full px-6 md:px-0"
        itemsPerRow={4}
        variables={{ isOpen: true, first: 36, orderBy: 'start_date,desc' }}
      />
    </main>
    <SiteFooter />
  </>
);

export default CampaignsIndexPage;
