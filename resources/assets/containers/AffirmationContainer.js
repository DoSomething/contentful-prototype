import { connect } from 'react-redux';
import Affirmation from '../components/Affirmation';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  content: state.campaign.affirmation,
});

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = { /* ... */ };

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Affirmation);
