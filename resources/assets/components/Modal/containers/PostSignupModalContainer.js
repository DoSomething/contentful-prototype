import { connect } from 'react-redux';
import PostSignupModal from '../configurations/PostSignupModal';

const mapStateToProps = state => ({
  competitionStep: state.campaign.actionSteps.find(step => (
    step.customType && step.customType === 'competition'
  )),
});

export default connect(mapStateToProps)(PostSignupModal);
