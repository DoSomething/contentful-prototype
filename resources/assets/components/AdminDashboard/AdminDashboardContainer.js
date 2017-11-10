import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';

const mapStateToProps = state => ({
  isAdmin: state.user.role === 'admin',
});

export default connect(mapStateToProps)(AdminDashboard);
