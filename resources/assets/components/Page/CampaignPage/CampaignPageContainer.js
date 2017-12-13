import get from 'lodash/get';
import { connect } from 'react-redux';

import CampaignPage from './CampaignPage';
import { convertExperiment, openModal } from '../../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  actionText: state.campaign.actionText,
  blurb: state.campaign.blurb,
  coverImage: state.campaign.coverImage,
  dashboard: state.campaign.dashboard,
  endDate: state.campaign.endDate,
  isAffiliated: state.signups.thisCampaign,
  hasActivityFeed: Boolean(state.campaign.activityFeed.length),
  affiliateSponsors: state.campaign.affiliateSponsors,
  affiliatePartners: state.campaign.affiliatePartners,
  campaignLead: get(state, 'campaign.campaignLead.fields', null),
  legacyCampaignId: state.campaign.legacyCampaignId,
  shouldShowActionPage: state.admin.shouldShowActionPage,
  slug: state.campaign.slug,
  subtitle: state.campaign.callToAction,
  template: state.campaign.template,
  title: state.campaign.title,
  totalCampaignSignups: state.signups.total,
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
