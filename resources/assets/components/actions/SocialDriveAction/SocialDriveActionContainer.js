import { connect } from 'react-redux';

import SocialDriveAction from './SocialDriveAction';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
  token: state.user.token,
});

// Export the container component.
export default connect(mapStateToProps)(SocialDriveAction);
