import { connect } from 'react-redux';

import { openModal } from '../../actions';
import ModalLauncher from './ModalLauncher';
import { getUserId, isAuthenticated } from '../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
  isAuthenticated: isAuthenticated(state),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapActionsToProps = {
  openModal,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, mapActionsToProps)(ModalLauncher);
