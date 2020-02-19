import React, { useState } from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';
import CampaignsFilterBar from './CampaignsFilterBar/CampaignsFilterBar';

const CampaignsIndexPage = () => {
  const [causes, setCauses] = useState([]);

  const handleSelect = event => {
    if (causes.includes(event.target.value)) {
      const newCauses = causes.filter(cause => {
        return cause !== event.target.value;
      });
      setCauses([...newCauses]);
    } else {
      setCauses([...causes, event.target.value]);
    }
  };
  const clearAll = () => {
    setCauses([]);
  };
  console.log('the causes array is updating correctly', causes);
  return (
    <>
      <SiteNavigationContainer />
      <main className="md:w-3/4 mx-auto">
        <h1 className="w-full my-6 pl-6 md:pl-0">Explore Campaigns</h1>
        <CampaignsFilterBar handleSelect={handleSelect} clearAll={clearAll} />
        <PaginatedCampaignGallery
          className="grid-full px-6 md:px-0"
          itemsPerRow={4}
          variables={{
            isOpen: true,
            first: 36,
            orderBy: 'start_date,desc',
            causes,
          }}
        />
      </main>
      <SiteFooter />
    </>
  );
};

export default CampaignsIndexPage;
