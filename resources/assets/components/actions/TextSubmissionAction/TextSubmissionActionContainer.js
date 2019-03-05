import { connect } from 'react-redux';

import TextSubmissionAction from './TextSubmissionAction';
import {
  initPostSubmissionItem,
  resetPostSubmissionItem,
  storeCampaignPost,
  storePost,
} from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  campaignContentfulId: state.campaign.id,
  submissions: state.postSubmissions,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  initPostSubmissionItem,
  resetPostSubmissionItem,
  storeCampaignPost,
  storePost,
};

/**
 * Export the container component.
 */
export default connect(
  mapStateToProps,
  actionCreators,
)(TextSubmissionAction);
