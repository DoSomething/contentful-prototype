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
    userToggledReactionOn: (reportbackItemId) => {
      dispatch(userToggledReactionOn(reportbackItemId));
    },

    userToggledReactionOff: (reportbackItemId) => {
      dispatch(userToggledReactionOff(reportbackItemId));
    },

    reactionComplete: (reportbackItemId, reactionId) => {
      dispatch(reactionComplete(reportbackItemId, reactionId));
    },
  }
}

const ReportbackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportbackBlock);

export default ReportbackContainer;
