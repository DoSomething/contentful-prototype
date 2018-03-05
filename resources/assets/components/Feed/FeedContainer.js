import { connect } from 'react-redux';
import Feed from './Feed';
import { clickedViewMore, clickedSignUp } from '../../actions';
import {
  getBlocksWithReportbacks,
  getVisibleBlocks,
  getTotalVisibleBlockPoints,
  getMaximumBlockPoints,
} from '../../selectors/feed';
import { isAuthenticated } from '../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  actionText: state.campaign.actionText,
  blocks: getBlocksWithReportbacks(getVisibleBlocks(state), state),
  canLoadMorePages: getTotalVisibleBlockPoints(state) < getMaximumBlockPoints(state),
  campaignId: state.campaign.legacyCampaignId,
  callToAction: state.campaign.callToAction,
  dashboard: state.campaign.dashboard,
  signedUp: state.signups.data.includes(state.campaign.legacyCampaignId),
  hasNewSignup: state.signups.thisSession,
  hasPendingSignup: state.signups.isPending,
  isAuthenticated: isAuthenticated(state),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedViewMore,
  clickedSignUp,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Feed);
