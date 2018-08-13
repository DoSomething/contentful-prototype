import { get } from 'lodash';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';
import { isSignedUp } from '../../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => {
  const landingPage = state.campaign.landingPage.fields;

  return {
    affiliateSponsors: state.campaign.affiliateSponsors,
    blurb: state.campaign.blurb,
    campaignId: state.campaign.id,
    coverImage: state.campaign.coverImage,
    dashboard: state.campaign.dashboard,
    endDate: state.campaign.endDate,
    isAffiliated: isSignedUp(state),
    legacyCampaignId: state.campaign.legacyCampaignId,
    pitchContent: landingPage.content,
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
    subtitle: state.campaign.callToAction,
    tagline: get(state.campaign.additionalContent, 'tagline'),
    template: state.campaign.template,
    title: state.campaign.title,
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(LandingPage);
