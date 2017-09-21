import { connect } from 'react-redux';

import LandingPage from './LandingPage';
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
  legacyCampaignId: state.campaign.legacyCampaignId,
  subtitle: state.campaign.callToAction,
  template: state.campaign.template,
  title: state.campaign.title,
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
export default connect(mapStateToProps, mapActionsToProps)(LandingPage);
