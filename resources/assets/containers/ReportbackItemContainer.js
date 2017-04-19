import { connect } from 'react-redux';
import ReportbackItem from '../components/ReportbackItem';
import {
  toggleReactionOn,
  toggleReactionOff,
} from '../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => {
  const reportback = state.reportbacks.entities[props.id];
  if (! reportback) {
    return { isFetching: true };
  }

  const reportbackItem = state.reportbacks.itemEntities[reportback.reportback_items[0]];
  return {
    isFetching: false,
    id: reportbackItem.id,
    url: reportbackItem.media.uri,
    quantity: reportback.quantity,
    firstName: reportback.user.first_name,
    reaction: reportbackItem.reaction,
    caption: reportbackItem.caption,
    isAuthenticated: state.user.id !== null,
    reportback,
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
