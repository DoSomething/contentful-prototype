import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

const mapStateToProps = (state) => {
  return {

  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {

};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Dashboard);
