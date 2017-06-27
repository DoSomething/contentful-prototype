import { connect } from 'react-redux';
import ActionPage from './ActionPage';
import { clickedSignUp, convertExperiment } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  steps: state.campaign.actionSteps,
  campaignId: state.campaign.legacyCampaignId,
  callToAction: state.campaign.callToAction,
  signedUp: state.signups.thisCampaign,
  hasPendingSignup: state.signups.isPending,
  isAuthenticated: state.user.id !== null,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
  convertExperiment,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(ActionPage);
