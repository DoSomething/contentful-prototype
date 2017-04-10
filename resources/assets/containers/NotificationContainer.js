import { connect } from 'react-redux';
import NotificationList from '../components/Notification';
import { removeNotification } from '../actions';

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.items,
  };
};

/**
 * Provide pre-bound functions that allow the component to dispatch
 * actions to the Redux store as props for this component.
 */
const actionCreators = {
  removeNotification,
};

// Export the container component.
export default connect(mapStateToProps, actionCreators)(NotificationList);
