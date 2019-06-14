import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import PetitionSubmissionAction from './PetitionSubmissionAction';
import { resetPostSubmissionItem, storePost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  pageId: state.page.id,
  submissions: state.postSubmissions,
  userId: getUserId(state),
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  resetPostSubmissionItem,
  storePost,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(PetitionSubmissionAction);
