import { get } from 'lodash';
import React, { useState } from 'react';

import { featureFlag } from '../../../helpers/env';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import FilterNavigation from './FilterNavigation/FilterNavigation';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

import './campaigns-page.scss';

const CampaignsIndexPage = () => {
<<<<<<< HEAD
  const [filters, setFilters] = useState(
    featureFlag('algolia_campaigns_search')
      ? {
          causes: [],
          actions: { actionTypes: [], isOnline: null },
        }
      : {
          causes: [],
        },
  );
=======
  const [filters, setFilters] = useState({ causes: [], actionTypes: [] });
>>>>>>> updates type and location files

  return (
    <>
      <SiteNavigationContainer />

      <main>
        <div className="bg-white border-b border-gray-300 border-solid mb-6 pt-6 md:pt-10">
          <h1 className="md:w-3/4 mx-auto mt-6 md:mb-2 text-xl pl-6 md:pl-0">
            Explore Campaigns
          </h1>
          <FilterNavigation filters={filters} setFilters={setFilters} />
        </div>
        <div className="md:w-3/4 mx-auto mb-6">
          <PaginatedCampaignGallery
            className="grid-full px-6 md:px-0"
            itemsPerRow={4}
            variables={{
              isOnline: get(filters, 'actions.isOnline', null),
              isOpen: true,
              first: 36,
              orderBy: 'start_date,desc',
              // @TODO depending on future implementation of filters in rogue,
              // potentially concatenate all filters to single array 🤔
              causes: get(filters, 'causes', []),
              actionTypes: get(filters, 'actions.actionTypes', []),
            }}
          />
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export default CampaignsIndexPage;
