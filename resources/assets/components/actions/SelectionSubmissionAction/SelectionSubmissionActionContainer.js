import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import SelectionSubmissionAction from './SelectionSubmissionAction';
import { resetPostSubmissionItem, storePost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  campaignContentfulId: state.campaign.id,
  campaignId: state.campaign.campaignId,
  submissions: state.postSubmissions,
  userId: getUserId(state),
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
