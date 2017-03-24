import { connect } from 'react-redux';
import ReportbackUploader from '../components/ReportbackUploader';
import { submitReportback, addToSubmissionsList, fetchUserReportbacks } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    campaignId: state.campaign.id,
    legacyCampaignId: state.campaign.legacyCampaignId,
    submissions: state.submissions,
    userId: state.user.id
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  submitReportback,
  addToSubmissionsList,
  fetchUserReportbacks,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(ReportbackUploader);
