import { connect } from 'react-redux';
import PostSignupModal from '../configurations/PostSignupModal';
import { closeModal } from '../../../actions/modal';

const mapStateToProps = state => ({
  competitionStep: state.campaign.actionSteps.find(step => (
    step.customType && step.customType === 'competition'
  )),
});

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(PostSignupModal);
