import { connect } from 'react-redux';

import ShareAction from './ShareAction';
import { getUserId, isAuthenticated } from '../../../selectors/user';
import { storeCampaignPost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
  campaignId: state.campaign.id,
  campaignRunId: state.campaign.legacyCampaignRunId,
  isAuthenticated: isAuthenticated(state),
  legacyCampaignId: state.campaign.legacyCampaignId,
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
