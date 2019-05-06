import { connect } from 'react-redux';

import UserQuery from './UserQuery';
import { getUserId } from '../../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(UserQuery);
