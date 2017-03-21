import { connect } from 'react-redux';
import ReportbackBlock from '../components/ReportbackBlock';
import {
  userToggledReactionOn,
  userToggledReactionOff,
} from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state) => {
  return {
    reactions: state.reactions,
    user: state.user,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  userToggledReactionOn,
  userToggledReactionOff,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(ReportbackBlock);
