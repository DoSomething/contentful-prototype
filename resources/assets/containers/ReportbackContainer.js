import { connect } from 'react-redux';
import ReportbackBlock from '../components/ReportbackBlock';
import {
  userLikedReportback,
  userUnlikedReportback,
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
    userLikedReportback: (reportbackItemId) => {
      dispatch(userLikedReportback(reportbackItemId));
    },

    userUnlikedReportback: (reportbackItemId) => {
      dispatch(userUnlikedReportback(reportbackItemId));
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
