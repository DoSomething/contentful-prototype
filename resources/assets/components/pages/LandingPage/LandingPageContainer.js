import { get } from 'lodash';
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

  return {
    campaignId: state.campaign.campaignId,
    content: landingPage.content,
    featureFlagUseLegacyTemplate: get(
      state,
      'campaign.additionalContent.featureFlagUseLegacyTemplate',
    ),
    isCampaignClosed: isCampaignClosed(state.campaign.endDate),
    scholarshipAmount: state.campaign.scholarshipAmount,
    scholarshipDeadline: state.campaign.scholarshipDeadline,
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
