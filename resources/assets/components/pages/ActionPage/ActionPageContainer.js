import { get } from 'lodash';
import { connect } from 'react-redux';

import ActionPage from './ActionPage';
import { isActionPage } from '../../../helpers';
import { isSignedUp } from '../../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => {
  const actionPage = state.campaign.pages.find(isActionPage);

  return {
    steps: get(actionPage, 'fields.blocks', []),
    dashboard: state.campaign.dashboard,
    signedUp: isSignedUp(state),
    featureFlags: get(state.campaign.additionalContent, 'featureFlags'),
  };
};

// Export the container component.
export default connect(mapStateToProps)(ActionPage);
