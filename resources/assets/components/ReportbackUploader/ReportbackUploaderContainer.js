import { connect } from 'react-redux';
import { get } from 'lodash';
import { PuckConnector } from '@dosomething/puck-client';
import ReportbackUploader from './ReportbackUploader';
import { submitReportback, addSubmissionItemToList } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
  submissions: state.submissions,
  noun: get(state.campaign.additionalContent, 'noun'),
  uploads: state.uploads,
  reportbackAffirmation: get(state.campaign.additionalContent, 'reportbackAffirmation'),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  submitReportback,
  addSubmissionItemToList,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(PuckConnector(ReportbackUploader));
