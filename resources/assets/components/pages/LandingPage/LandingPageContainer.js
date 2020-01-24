import { first, get } from 'lodash';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';
import { isCampaignClosed } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  // @TODO: while we have landing pages as either a page content type
  // or a landingPage content type, the ownProps is structured a bit
  // differently. Revise once all landing pages use landingPage type.
  const landingPage = get(ownProps, 'landingPage.fields', ownProps);
  // We use the first block in the landing page sidebar as the sidebar CTA.
  const sidebarCTA = get(first(landingPage.sidebar), 'fields');

  return {
    additionalContent: landingPage.additionalContent,
    campaignId: state.campaign.campaignId,
    content: landingPage.content,
    featureFlagUseLegacyTemplate: get(
      state,
      'campaign.additionalContent.featureFlagUseLegacyTemplate',
    ),
    isCampaignClosed: isCampaignClosed(state.campaign.endDate),
    scholarshipAmount: state.campaign.scholarshipAmount,
    scholarshipDeadline: state.campaign.scholarshipDeadline,
    sidebarCTA,
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
