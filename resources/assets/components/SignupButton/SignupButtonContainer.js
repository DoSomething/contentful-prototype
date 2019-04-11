import { connect } from 'react-redux';
import { get } from 'lodash';

import SignupButton from './SignupButton';
import { clickedSignupAction } from '../../actions/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affiliateMessagingOptIn: state.signups.affiliateMessagingOptIn,
  campaignActionText: state.campaign.actionText,
  campaignId: state.campaign.campaignId,
  campaignContentfulId: state.campaign.id,
  disableSignup: get(state.campaign, 'additionalContent.disableSignup', false),
  sourceActionText: get(state.campaign, 'additionalContent.sourceActionText'),
  template: state.campaign.template,
  trafficSource: state.user.source,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignupAction,
};

// Export the container component.
export default connect(
  mapStateToProps,
  actionCreators,
)(SignupButton);
