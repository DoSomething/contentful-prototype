import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chrome from '../components/Chrome';
import { clickedSignUp } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => ({
  children: props.children,
  legacyCampaignId: state.campaign.legacyCampaignId,
  isAffiliated: state.signups.thisCampaign,
  title: state.campaign.title,
  subtitle: state.campaign.callToAction,
  blurb: state.campaign.blurb,
  coverImage: state.campaign.coverImage,
  totalCampaignSignups: state.signups.total,
  dashboard: state.campaign.dashboard,
  endDate: state.campaign.endDate,
  user: state.user,
  signups: state.signups.data,
  competitions: state.competitions.data,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
};

// Export the container component.
export default withRouter(connect(mapStateToProps, actionCreators)(Chrome));
