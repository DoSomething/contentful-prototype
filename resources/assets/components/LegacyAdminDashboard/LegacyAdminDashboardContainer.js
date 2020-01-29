import { connect } from 'react-redux';

import { userHasRole } from '../../selectors/user';
import LegacyAdminDashboard from './LegacyAdminDashboard';

const mapStateToProps = state => ({
  enabled: userHasRole(state, ['admin', 'staff']),
});

export default connect(mapStateToProps)(LegacyAdminDashboard);
