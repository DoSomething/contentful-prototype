import { connect } from 'react-redux';
import { get } from 'lodash';
import ReportbackItem from './ReportbackItem';
import { isAuthenticated } from '../../selectors/user';
import { toggleReactionOn, toggleReactionOff } from '../../actions';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, props) => {
  const reportback = state.reportbacks.entities[props.id];

  if (!reportback) {
    return { isFetching: true };
  }

  const reportbackItem =
    state.reportbacks.itemEntities[reportback.reportback_items[0]];

  return {
    isFetching: false,
    id: reportbackItem.id,
    url: reportbackItem.media.uri,
    quantity: reportback.quantity,
    noun: get(state.campaign.additionalContent, 'noun'),
    firstName: reportback.user.first_name,
    reaction: reportbackItem.reaction,
    caption: reportbackItem.caption,
    isAuthenticated: isAuthenticated(state),
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
