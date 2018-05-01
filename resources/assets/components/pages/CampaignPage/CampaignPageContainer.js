import get from 'lodash/get';
import { connect } from 'react-redux';

import CampaignPage from './CampaignPage';
import { isCampaignClosed } from '../../../helpers';
import { userHasRole } from '../../../selectors/user';
import { convertExperiment, clickedHideAffirmation } from '../../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  affiliateSponsors: state.campaign.affiliateSponsors,
  affiliatePartners: state.campaign.affiliatePartners,
  campaignLead: get(state, 'campaign.campaignLead.fields', null),
  hasActivityFeed: Boolean(state.campaign.activityFeed.length),
  hasCommunityPage: Boolean(state.campaign.activityFeed.length),
  isAdmin: userHasRole(state, 'admin'),
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
export default connect(mapStateToProps, mapActionsToProps)(CampaignPage);
