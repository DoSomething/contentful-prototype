import { connect } from 'react-redux';

import SiteNavigation from './SiteNavigation';
import { getDataForNorthstar } from '../../selectors';
import { isAuthenticated } from '../../selectors/user';
import { buildAuthRedirectUrl } from '../../helpers/auth';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => {
  const northStarData = getDataForNorthstar(state);

  return {
    authLoginUrl: buildAuthRedirectUrl({ ...northStarData, mode: 'login' }),
    authRegisterUrl: buildAuthRedirectUrl(northStarData),
    isAuthenticated: isAuthenticated(state),
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(SiteNavigation);
