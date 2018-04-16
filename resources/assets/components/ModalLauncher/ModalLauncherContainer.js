import { connect } from 'react-redux';

import ModalLauncher from './ModalLauncher';
import { getUserId, isAuthenticated } from '../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
  isAuthenticated: isAuthenticated(state),
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(ModalLauncher);
