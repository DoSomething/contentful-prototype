import { connect } from 'react-redux';

import ProfileRoute from './ProfileRoute';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(ProfileRoute);
