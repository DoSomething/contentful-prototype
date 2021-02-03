import { connect } from 'react-redux';

import CampaignSignupForm from './CampaignSignupForm';
import { storeCampaignSignup, signupCreated } from '../../actions/signup';

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
  null,
  actionCreators,
)(CampaignSignupForm);
