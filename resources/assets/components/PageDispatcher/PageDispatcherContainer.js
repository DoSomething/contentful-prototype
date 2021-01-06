import { connect } from 'react-redux';

import PageDispatcher from './PageDispatcher';
import { getDataForNorthstar } from '../../selectors';
import { buildAuthRedirectUrl, isAuthenticated } from '../../helpers/auth';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  ...state.page,
  isAuthenticated: isAuthenticated(),
  authUrl: buildAuthRedirectUrl(getDataForNorthstar(state)),
});

// Export the container component.
export default connect(mapStateToProps)(PageDispatcher);
