import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { get, isArray, mergeWith } from 'lodash';

import Button from '../Button/Button';
import Spinner from '../../artifacts/Spinner/Spinner';
import ErrorBlock from '../../blocks/ErrorBlock/ErrorBlock';
import GalleryBlock from '../../blocks/GalleryBlock/GalleryBlock';

const PAGINATED_CAMPAIGNS_QUERY = gql`
  query campaignsByCauseQuery(
    $causes: [String]
    $cursor: String
    $first: Int
    $hasWebsite: Boolean
    $isOpen: Boolean
    $orderBy: String
  ) {
    campaigns: paginatedCampaigns(
      after: $cursor
      causes: $causes
      first: $first
      hasWebsite: $hasWebsite
      isOpen: $isOpen
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          id
          campaignWebsite {
            id
            slug
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

const PaginatedCampaignGallery = ({ className, itemsPerRow, variables }) => {
  const { error, loading, data, fetchMore } = useQuery(
    PAGINATED_CAMPAIGNS_QUERY,
    {
      variables: { ...variables, hasWebsite: true },
      notifyOnNetworkStatusChange: true,
    },
  );

  const { endCursor, hasNextPage } = get(data, 'campaigns.pageInfo', {});

  const handleViewMore = () => {
    fetchMore({
      variables: { cursor: endCursor },
      updateQuery: (previous, { fetchMoreResult }) =>
        mergeWith({}, previous, fetchMoreResult, (dest, src) =>
          // By default, Lodash's `merge` would try to merge *each* array
          // item (e.g. `edges[0]` with then next page's `edges[0]`).
          isArray(dest) ? [...dest, ...src] : undefined,
        ),
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
    <div className={className}>
      <GalleryBlock
        blocks={campaigns}
        itemsPerRow={itemsPerRow}
        imageAlignment="TOP"
      />
      {hasNextPage ? (
        <div className="p-6 text-center">
          <Button
            className="-tertiary"
            onClick={handleViewMore}
            disabled={loading}
          >
            view more...
          </Button>
        </div>
      ) : null}
    </div>
  );
};

PaginatedCampaignGallery.propTypes = {
  className: PropTypes.string,
  itemsPerRow: PropTypes.oneOf([2, 3, 4, 5]).isRequired,
  variables: PropTypes.shape({
    causes: PropTypes.arrayOf(PropTypes.string),
    isOpen: PropTypes.bool,
    orderBy: PropTypes.string,
    first: PropTypes.number,
  }),
};

PaginatedCampaignGallery.defaultProps = {
  className: null,
  variables: {},
};

export default PaginatedCampaignGallery;
