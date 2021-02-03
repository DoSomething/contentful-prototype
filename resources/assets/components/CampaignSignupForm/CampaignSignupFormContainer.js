import { connect } from 'react-redux';

import CampaignSignupForm from './CampaignSignupForm';
import { storeCampaignSignup, signupCreated } from '../../actions/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affiliateMessagingOptIn: state.signups.affiliateMessagingOptIn,
  campaignActionText: state.campaign.actionText,
  campaignId: state.campaign.campaignId,
  campaignTitle: state.campaign.title,
  endDate: state.campaign.endDate,
  pageId: state.campaign.id || state.page.id,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  storeCampaignSignup,
  signupCreated,
};

// Export the container component.
export default connect(
  mapStateToProps,
  actionCreators,
)(CampaignSignupForm);
