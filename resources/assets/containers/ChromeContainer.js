import { connect } from 'react-redux';
import Chrome from '../components/Chrome';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => {
  return {
    children: props.children,
    hasNewSignup: state.signups.thisSession,
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
