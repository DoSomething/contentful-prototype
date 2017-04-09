import { connect } from 'react-redux';
import Chrome from '../components/Chrome';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => {
  console.log(state);
  // console.log(props);
  return {
    children: props.children,
    hasNewSignup: state.signups.thisSession,
    isSignedUp: state.signups.thisCampagin,
    title: state.campaign.title,
    subtitle: state.campaign.callToAction,
    blurb: state.campaign.blurb,
    coverImage: state.campaign.coverImage,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  // ...
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Chrome);
