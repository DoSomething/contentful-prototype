import React, { useState } from 'react';

import FilterNavigation from './FilterNavigation';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

const CampaignsIndexPage = () => {
  const [causes, setCauses] = useState([]);
  // const [inCauses, setInputCauses] = ([]);
  const [showFilters, setShowFilters] = useState(false);

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
    // causes.forEach(cause => {
    //   where name === cause
    //     if cause.checked === true then set to false

    // })
    setCauses([]);
  };

  const handleFilterToggle = () => setShowFilters(!showFilters);

  return (
    <>
      <SiteNavigationContainer />
      <main className="md:w-3/4 mx-auto">
        <h1 className="w-full my-6 pl-6 md:pl-0">Explore Campaigns</h1>
        <FilterNavigation
          clearAll={clearAll}
          handleFilterToggle={handleFilterToggle}
          handleSelect={handleSelect}
          showFilters={showFilters}
        />
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
