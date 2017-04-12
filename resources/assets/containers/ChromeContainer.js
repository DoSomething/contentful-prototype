import { connect } from 'react-redux';
import Chrome from '../components/Chrome';
import { clickedSignUp } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => {
  return {
    children: props.children,
    legacyCampaignId: state.campaign.legacyCampaignId,
    isAffiliated: state.signups.thisCampaign,
    title: state.campaign.title,
    subtitle: state.campaign.callToAction,
    blurb: state.campaign.blurb,
    coverImage: state.campaign.coverImage,
    totalSignups: state.signups.total.toLocaleString(),
    dashboard: state.campaign.dashboard,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedSignUp,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Chrome);
