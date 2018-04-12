import { connect } from 'react-redux';

import { closeModal } from '../../../actions/modal';
import { getUserId } from '../../../selectors/user';
import VoterRegistrationModal from '../configurations/VoterRegistrationModal';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(VoterRegistrationModal);
