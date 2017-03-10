import { connect } from 'react-redux';
import ReportbackBlock from '../components/ReportbackBlock';
import { userLikedReportback, userUnlikedReportback } from '../actions';

const mapStateToProps = (state) => {
  return {
    reactions: state.reactions,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLikedReportback: (reportbackItemId) => {
      dispatch(userLikedReportback(reportbackItemId));
    },

    userUnlikedReportback: (reportbackItemId) => {
      dispatch(userUnlikedReportback(reportbackItemId));
    }
  }
}

const ReportbackContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportbackBlock);

export default ReportbackContainer;
