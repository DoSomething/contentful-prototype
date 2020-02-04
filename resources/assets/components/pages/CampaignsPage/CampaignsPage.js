import React from 'react';

import CampaignCard from './CampaignCard';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const CampaignsPageTemplate = () => {
  const campaigns = [
    {
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage:
        'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
      description: 'Collect jeans for local youth experiencing homelessness.',
    },
    {
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage:
        'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
      description: 'Collect jeans for local youth experiencing homelessness.',
    },
    {
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage:
        'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
      description: 'Collect jeans for local youth experiencing homelessness.',
    },
    {
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage:
        'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
      description: 'Collect jeans for local youth experiencing homelessness.',
    },
  ];
  return (
    <>
      <SiteNavigationContainer />
      <main className="md:w-3/4 mx-auto">
        <h1 className="w-full my-6 pl-2">Campaigns For All Causes</h1>
        <div className="gallery-grid-quartet">
          {campaigns.map(campaign => {
            return <CampaignCard campaign={campaign} />;
          })}
        </div>
      </main>
      <SiteFooter />
    </>
  );
};

export default CampaignsPageTemplate;
