import { connect } from 'react-redux';

import CampaignPage from './CampaignPage';
import { clickedSignUp, convertExperiment } from '../../../actions';

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
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, mapActionsToProps)(CampaignPage);
