import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions';

/**
 * Notifications reducer:
 */
const notifications = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      const notification = {
        style: action.style,
        message: action.message,
      };

      return {
        ...state,
        items: [
          ...state.items,
          notification,
        ],
      };

    case REMOVE_NOTIFICATION:
      const index = action.index;

      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ],
      };

    default:
      return state;
  }
}

export default notifications;
