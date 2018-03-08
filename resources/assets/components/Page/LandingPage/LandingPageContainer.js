import { get } from 'lodash';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  const landingPage = state.campaign.landingPage.fields;

  return {
    pitchContent: landingPage.content,
    tagline: get(state.campaign.additionalContent, 'tagline'),
    sidebar: landingPage.sidebar,
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(LandingPage);
