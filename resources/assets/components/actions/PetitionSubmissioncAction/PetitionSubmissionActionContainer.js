import { connect } from 'react-redux';

import {
  initPostSubmissionItem,
  resetPostSubmissionItem,
  storePost,
} from '../../../actions/post';
import PetitionSubmissionAction from './PetitionSubmissionAction';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  submissions: state.postSubmissions,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  initPostSubmissionItem,
  resetPostSubmissionItem,
  storePost,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(PetitionSubmissionAction);
