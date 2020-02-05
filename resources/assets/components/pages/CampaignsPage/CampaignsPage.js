import React from 'react';

// import CampaignCard from './CampaignCard';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const CampaignsPageTemplate = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage: {
        url:
          'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
        description: 'Teens For Jeans',
      },
      tagline: 'Collect jeans for local youth experiencing homelessness.',
      type: 'campaign',
    },
    {
      id: 2,
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage: {
        url:
          'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
        description: 'Teens For Jeans',
      },
      tagline: 'Collect jeans for local youth experiencing homelessness.',
      type: 'campaign',
    },
    {
      id: 3,
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage: {
        url:
          'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
        description: 'Teens For Jeans',
      },
      tagline: 'Collect jeans for local youth experiencing homelessness.',
      type: 'campaign',
    },
    {
      id: 4,
      title: 'Teens For Jeans',
      slug: 'https://dosomething.org',
      coverImage: {
        url:
          'https://images.ctfassets.net/81iqaqpfd8fy/5ZgtT1Jpw3xIbmICwVkvo6/372fe8c45423155a80fe3402f3ebc1e8/NEW_RBC_Header_Photo.jpg?w=400&h=400&fit=fill',
        description: 'Teens For Jeans',
      },
      tagline: 'Collect jeans for local youth experiencing homelessness.',
      type: 'campaign',
    },
  ];
  const itemsPerRow = 4;
  return (
    <>
      <SiteNavigationContainer />
      <main className="md:w-3/4 mx-auto">
        <h1 className="w-full my-6">Campaigns For All Causes</h1>
        <GalleryBlock
          blocks={campaigns}
          itemsPerRow={itemsPerRow}
          imageAlignment="TOP"
        />
      </main>
      <SiteFooter />
    </>
  );
};

export default CampaignsPageTemplate;
