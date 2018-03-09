import { connect } from 'react-redux';
import VoterRegistrationModal from '../configurations/VoterRegistrationModal';
import { closeModal } from '../../../actions/modal';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  northstarId: getUserId(state),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(VoterRegistrationModal);
