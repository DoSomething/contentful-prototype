import { connect } from 'react-redux';

import PageDispatcher from './PageDispatcher';
import { buildAuthRedirectUrl } from '../../helpers';
import { getDataForNorthstar } from '../../selectors';
import { isAuthenticated } from '../../selectors/user';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  ...state.page,
  isAuthenticated: isAuthenticated(state),
  authUrl: buildAuthRedirectUrl(getDataForNorthstar(state)),
});

// Export the container component.
export default connect(mapStateToProps)(PageDispatcher);
