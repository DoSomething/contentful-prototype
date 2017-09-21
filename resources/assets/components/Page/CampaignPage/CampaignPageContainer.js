import { get } from 'lodash';
import { connect } from 'react-redux';

import CampaignPage from './CampaignPage';
import { clickedSignUp, convertExperiment, openModal } from '../../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  blurb: state.campaign.blurb,
  coverImage: state.campaign.coverImage,
  dashboard: state.campaign.dashboard,
  endDate: state.campaign.endDate,
  isAffiliated: state.signups.thisCampaign,
  affiliateSponsors: state.campaign.affiliateSponsors,
  affiliatePartners: state.campaign.affiliatePartners,
  campaignLead: get(state.campaign.additionalContent, 'campaignLead'),
  legacyCampaignId: state.campaign.legacyCampaignId,
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
  clickedSignUp,
  convertExperiment,
  openModal,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, mapActionsToProps)(CampaignPage);
