import { connect } from 'react-redux';
import CallToActionBlock from '../components/CallToActionBlock';
import { clickedSignUp } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    isAffiliated: state.signups.thisCampaign,
    imageUrl: state.campaign.coverImage.url,
    legacyCampaignId: state.campaign.legacyCampaignId,
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
export default connect(mapStateToProps, actionCreators)(CallToActionBlock);
