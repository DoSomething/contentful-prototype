import { connect } from 'react-redux';
import CampaignFeed from '../components/CampaignFeed';
import {
  clickedViewMore,
  clickedSignUp,
  checkForSignup,
  setCurrentlySignedUp,
} from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    reportbacks: state.reportbacks,
    submissions: state.submissions,
    blocks: state.blocks,
    user: state.user,
    signups: state.signups,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedViewMore,
  clickedSignUp,
  checkForSignup,
  setCurrentlySignedUp,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(CampaignFeed);
