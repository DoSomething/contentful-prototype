import get from 'lodash/get';
import { connect } from 'react-redux';

import CampaignRoute from './CampaignRoute';
import { isCampaignClosed } from '../../../helpers';
import { convertExperiment, clickedHideAffirmation } from '../../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affiliateSponsors: state.campaign.affiliateSponsors,
  affiliatePartners: state.campaign.affiliatePartners,
  campaignLead: get(state, 'campaign.campaignLead.fields', null),
  hasCommunityPage: Boolean(
    state.campaign.pages.find(
      page => page.type === 'page' && page.fields.slug.endsWith('community'),
    ),
  ),
  isCampaignClosed: isCampaignClosed(
    get(state.campaign.endDate, 'date', false),
  ),
  legacyCampaignId: state.campaign.legacyCampaignId,
  shouldShowSignupAffirmation: state.signups.shouldShowAffirmation,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapActionsToProps = {
  convertExperiment,
  clickedHideAffirmation,
};

/**
 * Export the container component.
 */
export default connect(
  mapStateToProps,
  mapActionsToProps,
)(CampaignRoute);
