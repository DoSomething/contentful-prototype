import { connect } from 'react-redux';

import ReferralSubmissionAction from './ReferralSubmissionAction';
import {
  resetPostSubmissionItem,
  storeCampaignPost,
} from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  pageId: state.campaign.id || state.page.id,
  submissions: state.postSubmissions,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  resetPostSubmissionItem,
  storeCampaignPost,
};

/**
 * Export the container component.
 */
export default connect(
  mapStateToProps,
  actionCreators,
)(ReferralSubmissionAction);
