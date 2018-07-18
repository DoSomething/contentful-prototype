import { connect } from 'react-redux';

import ProfileRoute from './ProfileRoute';
import { isAuthenticated } from '../../../selectors/user';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
});

export default connect(mapStateToProps)(ProfileRoute);
