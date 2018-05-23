import { get } from 'lodash';
import { connect } from 'react-redux';

import ActionPage from './ActionPage';
import { isSignedUp } from '../../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => {
  const actionPage = state.campaign.pages.find(
    page => page.type === 'page' && page.fields.slug.endsWith('action'),
  );

  const steps = state.campaign.actionSteps.length
    ? state.campaign.actionSteps
    : actionPage.fields.blocks;

  return {
    steps,
    dashboard: state.campaign.dashboard,
    signedUp: isSignedUp(state),
    featureFlags: get(state.campaign.additionalContent, 'featureFlags'),
  };
};

// Export the container component.
export default connect(mapStateToProps)(ActionPage);
