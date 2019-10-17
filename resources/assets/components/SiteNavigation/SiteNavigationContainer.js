import { connect } from 'react-redux';

import SiteNavigation from './SiteNavigation';
import { getDataForNorthstar } from '../../selectors';
import { isAuthenticated } from '../../selectors/user';
import { buildAuthRedirectUrl } from '../../helpers/auth';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => {
  const northstarData = getDataForNorthstar(state);

  return {
    authLoginUrl: buildAuthRedirectUrl({ ...northstarData, mode: 'login' }),
    authRegisterUrl: buildAuthRedirectUrl(northstarData),
    isAuthenticated: isAuthenticated(state),
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(SiteNavigation);
