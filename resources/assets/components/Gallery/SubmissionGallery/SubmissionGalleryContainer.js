import { connect } from 'react-redux';

import SubmissionGallery from './SubmissionGallery';
import { fetchUserReportbacks } from '../../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  legacyCampaignId: state.campaign.legacyCampaignId,
  legacyCampaignRunId: state.campaign.legacyCampaignRunId,
  submissions: state.submissions,
  userId: state.user.id,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapDispatchToProps = {
  fetchUserReportbacks,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SubmissionGallery);
