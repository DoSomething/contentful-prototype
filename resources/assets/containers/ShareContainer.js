import { connect } from 'react-redux';
import Share from '../components/Share';
import { clickedShare } from '../actions';

const mapStateToProps = (state) => {
  return {
    share: status.share,
    user: state.user,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  clickedShare,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(Share);
