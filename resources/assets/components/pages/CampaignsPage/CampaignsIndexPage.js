import React from 'react';
import gql from 'graphql-tag';
// import { get } from 'lodash';
// import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import CampaignCards from './CampaignCard';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';

const CAMPAIGNS_PAGE_QUERY = gql`
  query CampaignsPageQuery($isOpen: Boolean, $cursor: String) {
    campaigns: paginatedCampaigns(
      isOpen: $isOpen
      after: $cursor
      first: 36
      orderBy: "id,desc"
      hasWebsite: true
    ) {
      edges {
        cursor
        node {
          id
          startDate
          campaignWebsite {
            slug
            url
            showcaseTitle
            showcaseDescription
            showcaseImage {
              url
              title
              description
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const CampaignsIndexPage = () => {
  const { error, loading, data } = useQuery(CAMPAIGNS_PAGE_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  // const { endCursor, hasNextPage } = get(data, 'campaigns.pageInfo', {});

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return (
    <>
      <SiteNavigationContainer />
      <main className="md:w-3/4 mx-auto">
        <h1 className="w-full my-6 pl-3">Campaigns For All Causes</h1>
        {!loading ? (
          <CampaignCards campaigns={data.campaigns.edges} />
        ) : (
          <Spinner className="flex justify-center p-6" />
        )}
      </main>
      <SiteFooter />
    </>
  );
};

CampaignsIndexPage.propTypes = {};

export default CampaignsIndexPage;
