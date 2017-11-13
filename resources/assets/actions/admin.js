import { SHOW_LANDING_PAGE } from '../actions';

/**
 * Action Creators: these functions create actions, which describe changes
 * to the state tree (either as a result of application logic or user input).
 */

// Action: show the campaigns landing page
export function clickedShowLandingPage() { // eslint-disable-line import/prefer-default-export
  return { type: SHOW_LANDING_PAGE };
}
