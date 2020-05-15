/*
 * Action names: import these constants to dispatch an event
 * without having hardcoded strings all about.
 *
 * Action Creators: these functions, exported from their respective action files,
 * create actions, which describe changes to the state tree (either as a result
 * of application logic or user input).
 */

// Signup Action Names & Creators
export const SIGNUP_CREATED = 'SIGNUP_CREATED';
export const OPENED_POST_SIGNUP_MODAL = 'OPENED_POST_SIGNUP_MODAL';
export const CLOSED_POST_SIGNUP_MODAL = 'CLOSED_POST_SIGNUP_MODAL';
export const HIDE_AFFIRMATION = 'HIDE_AFFIRMATION';
export const CLICKED_REMOVE_SIGN_UP = 'CLICKED_REMOVE_SIGN_UP';
export * from './signup';

// Notification Action Names & Creators
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export * from './notifications';

// Event Queue Names & Creators
export const QUEUE_EVENT = 'QUEUE_EVENT';
export const COMPLETED_EVENT = 'COMPLETED_EVENT';
export * from './event';

export const NEXT_SLIDE = 'NEXT_SLIDE';
export * from './slideshow';

// Post Creators
export * from './post';
