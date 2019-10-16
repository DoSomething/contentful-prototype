import { connect } from 'react-redux';

import SiteNavigation from './SiteNavigation';
import { buildAuthRedirectUrl } from '../../helpers';
import { getDataForNorthstar } from '../../selectors';
import { isAuthenticated } from '../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  authUrl: buildAuthRedirectUrl(getDataForNorthstar(state)),
  isAuthenticated: isAuthenticated(state),
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(SiteNavigation);
