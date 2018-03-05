import { connect } from 'react-redux';

import ModalLauncher from './ModalLauncher';
import { openModal } from '../../actions';

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
export default connect(null, mapActionsToProps)(ModalLauncher);
