import { connect } from 'react-redux';

import Survey from './Survey';

import { openModal } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  isAuthenticated: state.user.id !== null,
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
export default connect(mapStateToProps, mapActionsToProps)(Survey);
