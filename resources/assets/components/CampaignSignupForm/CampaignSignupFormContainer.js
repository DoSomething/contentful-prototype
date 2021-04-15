import { connect } from 'react-redux';

import { signupCreated } from '../../actions/signup';
import CampaignSignupForm from './CampaignSignupForm';

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  signupCreated,
};

// Export the container component.
export default connect(
  null,
  actionCreators,
)(CampaignSignupForm);
