import { connect } from 'react-redux';
import Feed from '../components/Feed';
import { clickedViewMore, clickedSignUp } from '../actions';
import { getBlocksWithReportbacks, getVisibleBlocks } from '../selectors/feed';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    blocks: getBlocksWithReportbacks(getVisibleBlocks(state), state.reportbacks.ids),
    callToAction: state.campaign.callToAction,
    submissions: state.submissions,
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
