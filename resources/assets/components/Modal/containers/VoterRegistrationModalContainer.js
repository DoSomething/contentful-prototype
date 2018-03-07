import { connect } from 'react-redux';
import VoterRegistrationModal from '../configurations/VoterRegistrationModal';
import { closeModal } from '../../../actions/modal';

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  closeModal,
};

export default connect(null, actionCreators)(VoterRegistrationModal);
