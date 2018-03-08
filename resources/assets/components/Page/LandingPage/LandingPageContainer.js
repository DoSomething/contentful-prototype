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
    blurb: state.campaign.blurb,
    coverImage: state.campaign.coverImage,
    dashboard: state.campaign.dashboard,
    endDate: state.campaign.endDate,
    isAffiliated: state.signups.thisCampaign,
    affiliateSponsors: state.campaign.affiliateSponsors,
    legacyCampaignId: state.campaign.legacyCampaignId,
    showPartnerMsgOptIn: get(state.campaign.additionalContent, 'displayAffilitateOptOut', false),
    signupArrowContent: get(state.campaign.additionalContent, 'signupArrowContent', null),
    subtitle: state.campaign.callToAction,
    tagline: get(state.campaign.additionalContent, 'tagline'),
    template: state.campaign.template,
    title: state.campaign.title,
    sidebar: landingPage.sidebar,
  };
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(LandingPage);
