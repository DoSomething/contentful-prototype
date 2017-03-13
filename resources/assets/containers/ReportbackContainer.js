import { connect } from 'react-redux';
import ReportbackBlock from '../components/ReportbackBlock';
import {
  userToggledReactionOn,
  userToggledReactionOff,
  reactionComplete,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    reactions: state.reactions,
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    userToggledReactionOn: (reportbackItemId, termId) => {
      dispatch(userToggledReactionOn(reportbackItemId, termId));
    },

    userToggledReactionOff: (reportbackItemId, reactionId) => {
      dispatch(userToggledReactionOff(reportbackItemId, reactionId));
    },
  }
}

const ReportbackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportbackBlock);

export default ReportbackContainer;
