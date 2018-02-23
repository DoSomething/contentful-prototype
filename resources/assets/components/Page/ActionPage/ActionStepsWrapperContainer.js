import { connect } from 'react-redux';
import ActionStepsWrapper from './ActionStepsWrapper';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.legacyCampaignId,
  callToAction: state.campaign.callToAction,
  hasActivityFeed: Boolean(state.campaign.activityFeed.length),
  hasPendingSignup: state.signups.isPending,
  isSignedUp: state.signups.thisCampaign,
  template: state.campaign.template,
});


// Export the container component.
export default connect(mapStateToProps)(ActionStepsWrapper);
