import { connect } from 'react-redux';
import Affirmation from '../components/Affirmation';
import { hideAffirmation } from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  shouldShowAffirmation: state.signups.shouldShowAffirmation,
  content: state.campaign.affirmation,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  hideAffirmation,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Affirmation);
