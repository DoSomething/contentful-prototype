import { connect } from 'react-redux';

import Feed from './Feed';
import { clickedViewMore } from '../../actions';
import { isAuthenticated } from '../../selectors/user';
import {
  getBlocksWithReportbacks,
  getVisibleBlocks,
  getTotalVisibleBlockPoints,
  getMaximumBlockPoints,
} from '../../selectors/feed';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  blocks: getBlocksWithReportbacks(getVisibleBlocks(state), state),
  canLoadMorePages:
    getTotalVisibleBlockPoints(state) < getMaximumBlockPoints(state),
  callToAction: state.campaign.callToAction,
  dashboard: state.campaign.dashboard,
  signedUp: state.signups.data.includes(state.campaign.legacyCampaignId),
  hasPendingSignup: state.signups.isPending,
  isAuthenticated: isAuthenticated(state),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedViewMore,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Feed);
