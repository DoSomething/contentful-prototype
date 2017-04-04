import { connect } from 'react-redux';
import Feed from '../components/Feed';
import { clickedViewMore, clickedSignUp } from '../actions';
import {
  getBlocksWithReportbacks,
  getVisibleBlocks,
  getBlockOffset,
  getMaximumOffset
} from '../selectors/feed';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    blocks: getBlocksWithReportbacks(getVisibleBlocks(state), state),
    canLoadMorePages: getBlockOffset(state) < getMaximumOffset(state),
    campaignId: state.campaign.legacyCampaignId,
    callToAction: state.campaign.callToAction,
    signedUp: state.signups.data.includes(state.campaign.legacyCampaignId),
    hasNewSignup: state.signups.thisSession,
    hasPendingSignup: state.signups.isPending,
    isAuthenticated: state.user.id !== null,
  };
};

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
