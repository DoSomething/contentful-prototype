import { connect } from 'react-redux';
import ReportbackUploader from '../components/ReportbackUploader';
import { submitReportback, addToSubmissionsList } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    submissions: state.submissions
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  submitReportback,
  addToSubmissionsList,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(ReportbackUploader);

