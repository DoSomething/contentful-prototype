import { connect } from 'react-redux';

import SelectionSubmissionAction from './SelectionSubmissionAction';
import { resetPostSubmissionItem, storePost } from '../../../actions/post';

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
const actionCreators = { resetPostSubmissionItem, storePost };

export default connect(
  mapStateToProps,
  actionCreators,
)(SelectionSubmissionAction);
