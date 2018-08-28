import { get } from 'lodash';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const landingPage = get(ownProps, 'landingPage.fields', ownProps);

  return {
    campaignId: state.campaign.id,
    content: landingPage.content,
    showPartnerMsgOptIn: get(
      state.campaign.additionalContent,
      'displayAffilitateOptOut',
      false,
    ),
    sidebar: landingPage.sidebar,
    signupArrowContent: get(
      state.campaign.additionalContent,
      'signupArrowContent',
      null,
    ),
    tagline: get(state.campaign.additionalContent, 'tagline'),
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(LandingPage);
