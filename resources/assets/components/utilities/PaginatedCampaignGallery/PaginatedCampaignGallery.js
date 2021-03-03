import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { updateQuery } from '../../../helpers';
import ElementButton from '../Button/ElementButton';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import { featureFlag, siteConfig } from '../../../helpers/env';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';
import { campaignCardFragment } from '../CampaignCard/CampaignCard';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

const PAGINATED_CAMPAIGNS_QUERY = gql`
  query PaginatedCampaignQuery(
    $causes: [String]
    $cursor: String
    $first: Int
    $isOpen: Boolean
    $orderBy: String
  ) {
    campaigns: paginatedCampaigns(
      after: $cursor
      causes: $causes
      first: $first
      hasWebsite: true
      isOpen: $isOpen
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          id
          groupTypeId
          campaignWebsite {
            ...CampaignCard
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${campaignCardFragment}
`;

const SEARCH_CAMPAIGNS_QUERY = gql`
  query SearchCampaignQuery(
    $actionTypes: [String]
    $causes: [String]
    $cursor: String
    $excludeIds: [Int]
    $first: Int
    $isOnline: Boolean
    $isOpen: Boolean
    $orderBy: String
    $timeCommitments: [String]
  ) {
    campaigns: searchCampaigns(
      actionTypes: $actionTypes
      cursor: $cursor
      causes: $causes
      excludeIds: $excludeIds
      perPage: $first
      hasWebsite: true
      isGroupCampaign: false
      isOnline: $isOnline
      isOpen: $isOpen
      orderBy: $orderBy
      timeCommitments: $timeCommitments
    ) {
      edges {
        cursor
        node {
          id
          campaignWebsite {
            ...CampaignCard
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${campaignCardFragment}
`;

const PaginatedCampaignGallery = ({
  className,
  itemsPerRow,
  title,
  variables,
}) => {
  const excludeIds = siteConfig('hide_campaign_ids', []);

  const { error, loading, data, fetchMore } = useQuery(
    featureFlag('algolia_campaigns_search')
      ? SEARCH_CAMPAIGNS_QUERY
      : PAGINATED_CAMPAIGNS_QUERY,
    {
      variables: { ...variables, excludeIds },
      notifyOnNetworkStatusChange: true,
    },
  );

  const { endCursor, hasNextPage } = get(data, 'campaigns.pageInfo', {});

  const handleViewMore = () => {
    trackAnalyticsEvent('clicked_view_more_link_campaigns', {
      action: 'link_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'view_more_campaigns',
    });
    fetchMore({
      variables: { cursor: endCursor },
      updateQuery,
    });
  };

  const campaigns = get(data, 'campaigns.edges', []);

  // Optionally, exclude any Group Campaigns, or Campaigns included in our list of Campaign ID's to hide from website discovery.
  const filteredCampaigns = campaigns.filter(
    campaign =>
      !get(campaign, 'node.groupTypeId') &&
      !excludeIds.includes(get(campaign, 'node.id')),
  );

  // Parse out the nested campaign website nodes so we can pass them to the Gallery Block.
  const campaignWebsites = filteredCampaigns.map(edge =>
    get(edge, 'node.campaignWebsite'),
  );

  if (error) {
    return (
      <div className={className}>
        <ErrorBlock error={error} />
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className={className}>
        <Spinner className="flex justify-center" />
      </div>
    );
  }

  return (
    <div className={className} data-testid="paginated-campaign-gallery">
      <GalleryBlock
        blocks={campaignWebsites}
        galleryType="CAMPAIGN"
        itemsPerRow={itemsPerRow}
        imageAlignment="TOP"
        title={title}
      />

      {hasNextPage ? (
        <div className="p-6 text-center">
          {!loading ? (
            <ElementButton
              attributes={{ 'data-test': 'view-more-button' }}
              className="font-normal text-gray-800 active:text-gray-900 hover:text-gray-800 underline hover:no-underline"
              onClick={handleViewMore}
              text="view more"
            />
          ) : (
            <Spinner className="flex justify-center" />
          )}
        </div>
      ) : null}
    </div>
  );
};

PaginatedCampaignGallery.propTypes = {
  className: PropTypes.string,
  itemsPerRow: PropTypes.oneOf([2, 3, 4, 5]).isRequired,
  title: PropTypes.string,
  variables: PropTypes.shape({
    causes: PropTypes.arrayOf(PropTypes.string),
    isOpen: PropTypes.bool,
    orderBy: PropTypes.string,
    first: PropTypes.number,
  }),
};

PaginatedCampaignGallery.defaultProps = {
  className: null,
  title: null,
  variables: {},
};

export default PaginatedCampaignGallery;
