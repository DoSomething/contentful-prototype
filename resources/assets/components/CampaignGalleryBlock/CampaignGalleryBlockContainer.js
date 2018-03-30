import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CampaignGalleryBlock from './CampaignGalleryBlock';

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
const query = gql`
  query PostGallery($campaignId: String!, $count: Int, $page: Int) {
    postsByCampaignId(id: $campaignId, count: $count, page: $page) {
      id
      status
      media {
        url
        text
      }
      user {
        id
        firstName
        lastInitial
      }
    }
  }
`;

/**
 * Customize the GraphQL query using the given props.
 */
const queryOptions = props => ({
  variables: {
    campaignId: props.campaignId,
    count: 9,
    page: 1,
  },
});

/**
 * Provide results of the GraphQL query as props for this component.
 */
const mapResultToProps = ({ data: { loading, postsByCampaignId, variables, fetchMore } }) => ({
  loading,
  postsByCampaignId,
  loadMorePosts: () => fetchMore({
    variables: {
      // The value in `variables.page` doesn't get updated here on
      // subsequent clicks, so we have to recalculate each time...
      page: (postsByCampaignId.length / variables.count) + 1,
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
  }),
});

// Export the Redux/GraphQL container component.
export default connect(mapStateToProps)(
  graphql(query, { options: queryOptions, props: mapResultToProps })(CampaignGalleryBlock),
);
