import { connect } from 'react-redux';

import SiteNavigation from './SiteNavigation';
import { buildAuthRedirectUrl, isAuthenticated } from '../../helpers/auth';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = () => ({
  authLoginUrl: buildAuthRedirectUrl({ mode: 'login' }),
  authRegisterUrl: buildAuthRedirectUrl(),
  isAuthenticated: isAuthenticated(),
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(SiteNavigation);
