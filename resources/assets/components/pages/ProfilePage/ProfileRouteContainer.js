import { connect } from 'react-redux';

import ProfileRoute from './ProfileRoute';
import { isAuthenticated, getUserId } from '../../../selectors/user';

const mapStateToProps = (state, props) => ({
  isAuthenticated: isAuthenticated(state),
  userId: getUserId(state),
  props,
});

export default connect(mapStateToProps)(ProfileRoute);
