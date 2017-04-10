import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: add a notification
export function addNotification(style, message) {
  return { type: ADD_NOTIFICATION, style, message };
}

// Action: close a notification
export function removeNotification(index) {
  return { type: REMOVE_NOTIFICATION, index };
}
