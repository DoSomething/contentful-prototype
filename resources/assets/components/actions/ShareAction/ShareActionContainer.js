import { connect } from 'react-redux';

import ShareAction from './ShareAction';
import { getUserId, isAuthenticated } from '../../../selectors/user';
import { storeCampaignPost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => ({
  userId: getUserId(state),
  campaignId: state.campaign.campaignId,
  isAuthenticated: isAuthenticated(state),
  campaignContentfulId: state.campaign.id,
  // Value comes through as Array, but component expects a String value.
  // @TODO: Update this Contentful field to be a String value.
  socialPlatform: ownProps.socialPlatform[0] || 'facebook',
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  storeCampaignPost,
};

// Export the container component.
export default connect(
  mapStateToProps,
  actionCreators,
)(ShareAction);
