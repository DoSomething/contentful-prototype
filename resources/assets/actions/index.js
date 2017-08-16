/*
 * Action names: import these constants to dispatch an event
 * without having hardcoded strings all about.
 *
 * Action Creators: these functions, exported from their respective action files,
 * create actions, which describe changes to the state tree (either as a result
 * of application logic or user input).
 */
import { LOCATION_CHANGE } from 'react-router-redux';

export const PARTICIPATE_IN_EXPERIMENT = 'PARTICIPATE_IN_EXPERIMENT';
export const ADD_TO_EXPERIMENTS_STORE = 'ADD_TO_EXPERIMENTS_STORE';
export const UPDATE_EXPERIMENTS_STORE = 'UPDATE_EXPERIMENTS_STORE';
export const CONVERT_EXPERIMENT = 'CONVERT_EXPERIMENT';
export * from './experiments';

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
export const HIDE_AFFIRMATION = 'HIDE_AFFIRMATION';
export const SET_TOTAL_SIGNUPS = 'SET_TOTAL_SIGNUPS';
export * from './signup';

export const JOINED_COMPETITION = 'JOINED_COMPETITION';
export const COMPETITION_FOUND = 'COMPETITION_FOUND';
export const COMPETITION_PENDING = 'COMPETITION_PENDING';
export * from './competition';

// Social Action Names & Creators
export const REQUESTED_FACEBOOK_SHARE = 'REQUESTED_FACEBOOK_SHARE';
export const FACEBOOK_SHARE_COMPLETED = 'FACEBOOK_SHARE_COMPLETED';
export const FACEBOOK_SHARE_CANCELLED = 'FACEBOOK_SHARE_CANCELLED';
export * from './share';

// Notification Action Names & Creators
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export * from './notifications';

// Event Queue Names & Creators
export const QUEUE_EVENT = 'QUEUE_EVENT';
export const COMPLETED_EVENT = 'COMPLETED_EVENT';
export * from './event';

// Analytics Action Names & Creators
export const APPLICATION_INIT = 'APPLICATION_INIT';
export * from './analytics';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export * from './modal';

export const QUIZ_INIT = 'QUIZ_INIT';
export const PICK_QUIZ_ANSWER = 'PICK_QUIZ_ANSWER';
export const VIEW_QUIZ_RESULT = 'VIEW_QUIZ_RESULT';
export const COMPARE_QUIZ_ANSWER = 'COMPARE_QUIZ_ANSWER';
export const QUIZ_ERROR = 'QUIZ_ERROR';
export * from './quiz';

export const ANALYTICS_ACTIONS = [
  ADD_NOTIFICATION,
  ADD_SUBMISSION_ITEM_TO_LIST,
  ADD_SUBMISSION_METADATA,
  APPLICATION_INIT,
  COMPLETED_EVENT,
  CONVERT_EXPERIMENT,
  FACEBOOK_SHARE_CANCELLED,
  FACEBOOK_SHARE_COMPLETED,
  FEED_INCREMENT_PAGE,
  HIDE_AFFIRMATION,
  JOINED_COMPETITION,
  LOCATION_CHANGE,
  PARTICIPATE_IN_EXPERIMENT,
  QUEUE_EVENT,
  REACTION_CHANGED,
  REACTION_COMPLETE,
  RECEIVED_USER_SUBMISSIONS,
  REMOVE_NOTIFICATION,
  REQUESTED_FACEBOOK_SHARE,
  REQUESTED_REPORTBACKS,
  REQUESTED_USER_SUBMISSIONS,
  REQUESTED_USER_SUBMISSIONS_FAILED,
  SIGNUP_CREATED,
  STORE_REPORTBACK_FAILED,
  STORE_REPORTBACK_PENDING,
  STORE_REPORTBACK_SUCCESSFUL,
  OPEN_MODAL,
  CLOSE_MODAL,
  QUIZ_INIT,
  PICK_QUIZ_ANSWER,
  COMPARE_QUIZ_ANSWER,
  VIEW_QUIZ_RESULT,
  QUIZ_ERROR,
];
