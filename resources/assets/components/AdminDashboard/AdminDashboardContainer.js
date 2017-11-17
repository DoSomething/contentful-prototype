import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import { userHasRole } from '../../selectors/user';

const mapStateToProps = state => ({
  enabled: userHasRole(state, ['admin', 'staff']),
});

export default connect(mapStateToProps)(AdminDashboard);
