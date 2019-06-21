import get from 'lodash/get';
import { connect } from 'react-redux';

import CampaignRoute from './CampaignRoute';
import { isCampaignClosed } from '../../../helpers';
import { clickedHideAffirmation } from '../../../actions';
import { isCampaignSignUpInState } from '../../../selectors/signup';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affiliateCreditText: get(
    state,
    'campaign.additionalContent.affiliateCreditText',
    undefined,
  ),
  affiliateSponsors: state.campaign.affiliateSponsors,
  affiliatePartners: state.campaign.affiliatePartners,
  affirmation: state.campaign.affirmation,
  campaignLead: get(state, 'campaign.campaignLead.fields', null),
  hasCommunityPage: Boolean(
    state.campaign.pages.find(
      page => page.type === 'page' && page.fields.slug.endsWith('community'),
    ),
  ),
  isCampaignClosed: isCampaignClosed(state.campaign.endDate),
  isSignedUp: isCampaignSignUpInState(state),
  landingPage: get(state.campaign, 'landingPage', null),
  shouldShowAffirmation: state.signups.shouldShowAffirmation,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapActionsToProps = {
  clickedHideAffirmation,
};

/**
 * Export the container component.
 */
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(CampaignRoute);
