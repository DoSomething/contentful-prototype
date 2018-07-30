import { connect } from 'react-redux';

import ProfilePage from './ProfilePage';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(ProfilePage);
