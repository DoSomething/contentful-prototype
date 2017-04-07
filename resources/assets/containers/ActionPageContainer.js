import { connect } from 'react-redux';
import ActionPage from '../components/ActionPage';
import { clickedSignUp } from '../actions';
import { lipsum } from '../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    steps: state.campaign.actionSteps,
    campaignId: state.campaign.legacyCampaignId,
    callToAction: state.campaign.callToAction,
    signedUp: state.signups.data.includes(state.campaign.legacyCampaignId),
    hasPendingSignup: state.signups.isPending,
    isAuthenticated: state.user.id !== null,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(ActionPage);
