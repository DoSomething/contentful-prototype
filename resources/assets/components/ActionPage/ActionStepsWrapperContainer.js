import { connect } from 'react-redux';
import { get } from 'lodash';
import ActionStepsWrapper from './ActionStepsWrapper';
import { clickedSignUp } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
  callToAction: state.campaign.callToAction,
  featureFlags: get(state.campaign.additionalContent, 'featureFlags'),
  hasPendingSignup: state.signups.isPending,
  isSignedUp: state.signups.thisCampaign,
  isAuthenticated: state.user.id !== null,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapDispatchToProps = {
  clickedSignUp,
};

// Export the container component.
export default connect(mapStateToProps, mapDispatchToProps)(ActionStepsWrapper);
