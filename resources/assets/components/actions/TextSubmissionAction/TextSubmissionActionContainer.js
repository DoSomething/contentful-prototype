import { connect } from 'react-redux';

import TextSubmissionAction from './TextSubmissionAction';
import { clearPostSubmissionItem, storeCampaignPost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
  legacyCampaignRunId: state.campaign.legacyCampaignRunId,
  submissions: state.postSubmissions,
  type: 'text',
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clearPostSubmissionItem,
  storeCampaignPost,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, actionCreators)(TextSubmissionAction);
