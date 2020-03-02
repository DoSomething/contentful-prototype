import React, { useState } from 'react';
import { get } from 'lodash';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import FilterNavigation from './FilterNavigation/FilterNavigation';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

import './campaigns-page.scss';

const CampaignsIndexPage = () => {
  const [filters, setFilters] = useState({ causes: [] });

  return (
    <>
      <SiteNavigationContainer />

      <main className="campaigns-page md:w-3/4 mx-auto">
        <h1 className="w-full my-6 pl-6 md:pl-0">Explore Campaigns</h1>

        <FilterNavigation filters={filters} setFilters={setFilters} />

        <PaginatedCampaignGallery
          className="grid-full px-6 md:px-0"
          itemsPerRow={4}
          variables={{
            isOpen: true,
            first: 36,
            orderBy: 'start_date,desc',
            // @TODO depending on future implementation of filters in rogue,
            // potentially concatenate all filters to single array 🤔
            causes: get(filters, 'causes', []),
          }}
        />
      </main>

      <SiteFooter />
    </>
  );
};

export default CampaignsIndexPage;
