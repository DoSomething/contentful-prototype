import { connect } from 'react-redux';
import ReportbackItem from '../components/ReportbackItem';
import find from 'lodash/find';
import {
  toggleReactionOn,
  toggleReactionOff,
} from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => {
  const reportback = find(state.reportbacks.data, {id: props.id});
  const reportbackItem = reportback.reportback_items.data[0];

  return {
    isFetching: false,
    id: reportbackItem.id,
    url: reportbackItem.media.uri,
    quantity: reportback.quantity,
    firstName: reportback.user.first_name,
    reaction: state.reactions.data[reportbackItem.id],
    isAuthenticated: state.user.id !== null,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  toggleReactionOn,
  toggleReactionOff,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(ReportbackItem);
