import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import { updateQuery } from '../../../helpers';
import ElementButton from '../Button/ElementButton';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';

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
          campaignWebsite {
            id
            path
            showcaseTitle
            showcaseDescription
            showcaseImage {
              url
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

const PaginatedCampaignGallery = ({
  className,
  itemsPerRow,
  title,
  variables,
}) => {
  const { error, loading, data, fetchMore } = useQuery(
    PAGINATED_CAMPAIGNS_QUERY,
    {
      variables: { ...variables },
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

  // Parse out the nested campaign website nodes so we can pass them to the Gallery Block.
  const campaigns = get(data, 'campaigns.edges', []).map(edge =>
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
    <div className={className} data-ref="paginated-campaign-gallery">
      <GalleryBlock
        blocks={campaigns}
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
