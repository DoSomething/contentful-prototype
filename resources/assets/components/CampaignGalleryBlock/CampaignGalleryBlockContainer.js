import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import CampaignGalleryBlock from './CampaignGalleryBlock';
import ErrorBlock from '../ErrorBlock/ErrorBlock';
import { NetworkStatus } from '../../constants';

/**
 * Provide state from the Redux store as props for this component. (In
 * this case, we just need the campaign ID for our GraphQL query!)
 */
const mapStateToProps = state => ({
  campaignId: String(state.campaign.legacyCampaignId),
});

/**
 * The GraphQL query to load data for this component.
 */
const POST_GALLERY_QUERY = gql`
  query PostGallery($campaignId: String!, $count: Int, $page: Int) {
    postsByCampaignId(id: $campaignId, count: $count, page: $page) {
      id
      status
      url
      text
      user {
        id
        firstName
        lastInitial
      }
    }
  }
`;

/**
 * Fetch results via GraphQL using a query component.
 */
const CampaignGalleryQuery = ({ campaignId }) => (
  <Query
    query={POST_GALLERY_QUERY}
    variables={{ campaignId, count: 9, page: 1 }}
    notifyOnNetworkStatusChange
  >
    {({ data, error, networkStatus, variables, fetchMore }) => {
      // On initial load, just display a loading spinner.
      if (networkStatus === NetworkStatus.LOADING) {
        return <div className="spinner -centered" />;
      }

      if (error) {
        console.error(`CampaignGalleryQuery ERROR: ${error}`);
        return <ErrorBlock />;
      }

      return (
        <CampaignGalleryBlock
          postsByCampaignId={data.postsByCampaignId}
          loading={networkStatus === NetworkStatus.FETCH_MORE}
          loadMorePosts={() => fetchMore({
            variables: {
              // The value in `variables.page` doesn't get updated here on
              // subsequent clicks, so we have to recalculate each time...
              page: (data.postsByCampaignId.length / variables.count) + 1,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if (! fetchMoreResult.postsByCampaignId) {
                return previousResult;
              }

              return {
                ...previousResult,
                postsByCampaignId: [
                  ...previousResult.postsByCampaignId,
                  ...fetchMoreResult.postsByCampaignId,
                ],
              };
            },
          })}
        />
      );
    }}
  </Query>
);

CampaignGalleryQuery.propTypes = {
  campaignId: PropTypes.string.isRequired,
};

// Export the Redux/GraphQL container component.
export default connect(mapStateToProps)(CampaignGalleryQuery);
