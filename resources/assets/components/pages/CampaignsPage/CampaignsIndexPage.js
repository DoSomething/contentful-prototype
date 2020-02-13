import React from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

const CampaignsIndexPage = () => (
  <>
    <SiteNavigationContainer />
    <main className="md:w-3/4 mx-auto">
      <PaginatedCampaignGallery
        className="grid-full-8/12"
        title="Campaigns For All Causes"
        itemsPerRow={4}
        variables={{ isOpen: true, first: 36 }}
      />
    </main>
    <SiteFooter />
  </>
);

export default CampaignsIndexPage;
