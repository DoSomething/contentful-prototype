import { connect } from 'react-redux';
import PostSignupModal from '../configurations/PostSignupModal';
import { closeModal } from '../../../actions/modal';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affirmation: state.campaign.affirmation,
  competitionStep: state.campaign.actionSteps.find(step => (
    step.customType && step.customType === 'competition'
  )),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(PostSignupModal);
