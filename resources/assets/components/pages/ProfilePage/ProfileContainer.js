import { connect } from 'react-redux';

import ProfilePage from './ProfilePage';

const mapStateToProps = state => ({
  userId: String(state.user.id),
});

export default connect(mapStateToProps)(ProfilePage);
