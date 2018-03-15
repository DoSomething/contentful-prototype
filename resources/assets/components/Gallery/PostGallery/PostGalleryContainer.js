import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PostGallery from './PostGallery';

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
  query PostGallery($campaignId: String!, $count: Int) {
    postsByCampaignId(id: $campaignId, count: $count) {
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

// Export the container component.
export default connect(mapStateToProps)(
  graphql(query)(PostGallery),
);
