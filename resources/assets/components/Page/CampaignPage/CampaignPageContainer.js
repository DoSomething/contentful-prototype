import get from 'lodash/get';
import { connect } from 'react-redux';

import CampaignPage from './CampaignPage';
import { convertExperiment, openModal } from '../../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  hasActivityFeed: Boolean(state.campaign.activityFeed.length),
  affiliateSponsors: state.campaign.affiliateSponsors,
  affiliatePartners: state.campaign.affiliatePartners,
  campaignLead: get(state, 'campaign.campaignLead.fields', null),
  legacyCampaignId: state.campaign.legacyCampaignId,
  shouldShowActionPage: state.admin.shouldShowActionPage,
  template: state.campaign.template,
  endDate: state.campaign.endDate,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const mapActionsToProps = {
  convertExperiment,
  openModal,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, mapActionsToProps)(CampaignPage);
