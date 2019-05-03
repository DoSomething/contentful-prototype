import { connect } from 'react-redux';

import UserQuery from './UserQuery';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
  title: state.title,
  softEdgeId: state.softEdgeId,
});

export default connect(mapStateToProps)(UserQuery);
