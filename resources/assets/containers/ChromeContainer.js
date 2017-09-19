import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import Chrome from '../components/Chrome';
import { clickedSignUp, convertExperiment } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => ({
  children: props.children,
  legacyCampaignId: state.campaign.legacyCampaignId,
  isAffiliated: state.signups.thisCampaign,
  affiliateSponsors: state.campaign.affiliateSponsors,
  affiliatePartners: state.campaign.affiliatePartners,
  title: state.campaign.title,
  subtitle: state.campaign.callToAction,
  blurb: state.campaign.blurb,
  coverImage: state.campaign.coverImage,
  totalCampaignSignups: state.signups.total,
  dashboard: state.campaign.dashboard,
  endDate: state.campaign.endDate,
  noun: get(state.campaign.additionalContent, 'noun'),
  verb: get(state.campaign.additionalContent, 'verb'),
  shouldShowModal: state.modal.shouldShowModal,
  template: state.campaign.template,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
  convertExperiment,
};

// Export the container component.
export default withRouter(connect(mapStateToProps, actionCreators)(Chrome));
