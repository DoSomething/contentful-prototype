import { SHOW_LANDING_PAGE, SHOW_ACTION_PAGE } from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: show the campaigns landing page
export function clickedShowLandingPage() {
  return { type: SHOW_LANDING_PAGE };
}

export function clickedShowActionPage() {
  return { type: SHOW_ACTION_PAGE };
}
