import React, { useState } from 'react';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import PaginatedCampaignGallery from '../../utilities/PaginatedCampaignGallery/PaginatedCampaignGallery';

const CampaignsIndexPage = () => {
  const [causes, setCauses] = useState([]);

  const handleClick = event => setCauses([...causes, event.target.value]);
  console.log('our causes', causes);
  return (
    <>
      <SiteNavigationContainer />
      <main className="md:w-3/4 mx-auto">
        <h1 className="w-full my-6 pl-6 md:pl-0">Campaigns For All Causes</h1>
        <form>
          <input
            name="environment"
            type="checkbox"
            value="environment"
            onClick={handleClick}
          />
        </form>
        <PaginatedCampaignGallery
          className="grid-full px-6 md:px-0"
          itemsPerRow={4}
          variables={{ isOpen: true, first: 36, orderBy: 'start_date,desc' }}
        />
      </main>
      <SiteFooter />
    </>
  );
};

export default CampaignsIndexPage;
