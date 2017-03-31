/*
 * Action names: import these constants to dispatch an event
 * without having hardcoded strings all about.
 *
 * Action Creators: these functions, exported from their respective action files,
 * create actions, which describe changes to the state tree (either as a result
 * of application logic or user input).
 */

// Reportback Action Names & Creators
export const REQUESTED_REPORTBACKS = 'REQUESTED_REPORTBACKS';
export const RECEIVED_REPORTBACKS = 'RECEIVED_REPORTBACKS';
export const REACTION_CHANGED = 'REACTION_CHANGED';
export const REACTION_COMPLETE = 'REACTION_COMPLETE';
export * from './reportback';

// Submissions
export const STORE_REPORTBACK_PENDING = 'STORE_REPORTBACK_PENDING';
export const STORE_REPORTBACK_FAILED = 'STORE_REPORTBACK_FAILED';
export const STORE_REPORTBACK_SUCCESSFUL = 'STORE_REPORTBACK_SUCCESSFUL';
export const ADD_SUBMISSION_METADATA = 'ADD_SUBMISSION_METADATA';
export const ADD_SUBMISSION_ITEM_TO_LIST = 'ADD_SUBMISSION_ITEM_TO_LIST';
export const REQUESTED_USER_SUBMISSIONS = 'REQUESTED_USER_SUBMISSIONS';
export const REQUESTED_USER_SUBMISSIONS_FAILED = 'REQUESTED_USER_SUBMISSIONS_FAILED';
export const RECEIVED_USER_SUBMISSIONS = 'RECEIVED_USER_SUBMISSIONS';
// @TODO: Split submission actions & reducers into separate file.
// export * from './submission';

// Feed Action Names & Creators
export const FEED_INCREMENT_PAGE = 'FEED_INCREMENT_PAGE';
export * from './feed';

// Signup Action Names & Creators
export const SIGNUP_CREATED = 'SIGNUP_CREATED';
export const SIGNUP_FOUND = 'SIGNUP_FOUND';
export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_NOT_FOUND = 'SIGNUP_NOT_FOUND';
export * from './signup';

// Social Action Names & Creators
export const REQUESTED_FACEBOOK_SHARE = 'REQUESTED_FACEBOOK_SHARE';
export const FACEBOOK_SHARE_COMPLETED = 'FACEBOOK_SHARE_COMPLETED';
export const FACEBOOK_SHARE_CANCELLED = 'FACEBOOK_SHARE_CANCELLED';
export * from './share';

// Event Queue Names & Creators
export const QUEUE_EVENT = 'QUEUE_EVENT';
export const COMPLETED_EVENT = 'COMPLETED_EVENT';
export * from './event';
